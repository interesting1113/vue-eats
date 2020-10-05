<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 专场 -->
        <li class="menu-item"
            :class="{'current': currentIndex === 0 }"
            @click="selectMenu(0)">
          <p class="text">
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon">
            {{ container.tag_name }}
          </p>
        </li>
        <li class="menu-item"
            :class="{'current':
            currentIndex === index+1 }"
            v-for="(item, index) in goods"
            :key="index"
            @click="selectMenu(index+1)">
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon">
            {{ item.name}}
          </p>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook">
          <div v-for="(item, index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url">
          </div>
        </li>
        <!-- 具体分类 -->
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h3 class="title">{{ item.name }}</h3>
          <!-- 具体商品列表 -->
          <ul>
            <li v-for="(item, index) in item.spus" :key="index" class="food-item">
              <div class="icon" :style="head_bg(item.picture)"></div>
              <div class="content">
                <h3 class="name">{{ item.name }}</h3>
                <p v-if="item.description" class="desc">{{ item.description }}</p>
                <div class="extra">
                  <span class="sold">{{ item.month_saled_content }}</span>
                  <span class="praise">{{ item.praise_content }}</span>
                </div>
                <img class="product" :src="item.product_label_picture">
                <p class="price">
                  <span class="text">¥{{ item.min_price }}</span>
                  <span class="unit">/{{ item.unit }}</span>
                </p>
              </div>
              <div class="cart-control-wrapper">
                <cart-control></cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <shop-cart :poiInfo="poiInfo"></shop-cart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ShopCart from '@/components/shopCart/ShopCart'
import CartControl from '@/components/cartControl/CartControl'
export default {
  data() {
    return {
      container: {},
      goods: [],
      poiInfo: [],
      listHeight: [],
      menuScroll: {},
      foodScroll: {},
      scrollY: 0
    }
  },
  created() {
    this.getGoods()
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
      // 获取商品区间的范围
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 是否在上述区间
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    getGoods() {
      this.$axios.get('api/goods')
        .then(res => {
          const { data } = res.data
          if (data.code === 0) {
            this.container = data.data.container_operation_source
            this.goods = data.data.food_spu_tags
            this.poiInfo = data.data.poi_info
            // DOM已经更新
            this.$nextTick(() => {
              // 执行滚动
              this.initScroll()
              // 计算分类区间的高度
              this.calculateHeight()
              // 监听滚动的位置
              // 根据滚动位置确认下标，与左侧对应
              // 通过下标实现点击左侧，滚动右侧
            })
          }
        })
    },
    head_bg(img) {
      return 'background-image: url(' + img + ');'
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll)
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3
      })
      // foodScroll监听事件
      this.foodScroll.on('scroll', pos => {
        // console.log(pos.y)
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log(scrollY)
      })
    },
    calculateHeight() {
      let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      // console.log(foodList)
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    },
    selectMenu(index) {
      console.log('000')
      let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      let element = foodList[index]
      console.log(element)
      // 滚动到对应元素的位置
      this.foodScroll.scrollToElement(element, 250)
    }
  },
  components: {
    ShopCart,
    CartControl
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
}

.goods .menu-wrapper{
  flex:0 0 85px;
  background: #f4f4f4;
}
.goods .foods-wrapper{
  flex:1;
  /* background: blue; */
}

/* Menu item */
.goods .menu-wrapper .menu-item{
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #E4E4E4;
  position: relative;
}

.goods .menu-wrapper .menu-item .text{
  font-size: 13px;
  color: #333333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .menu-wrapper .menu-item .text .icon{
  width: 15px;
  height: 15px;
  vertical-align: middle;
}

/* 专场样式 */
.goods .foods-wrapper .container-list{
  padding: 11px 11px 0 11px;
  border-bottom: 1px solid #E4E4E4;
}

.goods .foods-wrapper .container-list img{
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}

/* 具体分类商品布局 */
.goods .foods-wrapper .food-list{
  padding: 11px;
}

.goods .foods-wrapper .food-list .title{
  height: 13px;
  font-size: 13px;
  background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
  background-size: 2px 10px;
  padding-left: 7px;
  margin-bottom: 12px;
}

.goods .foods-wrapper .food-list .food-item{
  display: flex;
  margin-bottom: 25px;
  position: relative;
}

.goods .foods-wrapper .food-list .food-item  .icon{
  flex: 0 0 63px;
  background-position: center;
  background-size: 120% 100%;background-repeat: no-repeat;
  margin-right: 11px;
  height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content{
  flex: 1;
}

/* 具体内容样式 */
.goods .foods-wrapper .food-list .food-item .content .name{
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}

.goods .foods-wrapper .food-list .food-item .content .desc{
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;

  /* 超出部分显示省略号*/
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra{
  font-size: 10px;
  color: #BFBFBF;
  margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .sold{
  margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product{
  height: 15px;
  margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price{
  font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text{
  font-size: 14px;
  color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit{
  font-size: 12px;
  color: #BFBFBF;
}

/* 当前选中 */
.goods .menu-wrapper .menu-item.current{
  background: white;
  font-weight: bold;
  margin-top: -1px;
}
.goods .menu-wrapper .menu-item:first-child.current{
  margin-top: 1px;
}

.goods .foods-wrapper .food-list .food-item .cart-control-wrapper{
  position: absolute;
  right: 0;
  bottom: 0;
}

.goods .menu-wrapper .menu-item .num{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  color: white;
  background: red;
  text-align: center;
  font-size: 7px;
  line-height: 13px;
}
</style>
