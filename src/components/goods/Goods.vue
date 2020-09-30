<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="goods-li">
        <li v-for="(item, index) in goods" :key="index" class="menu-item"
            :class="{'current': currentIndex===$index}"
            @click="selectMenu($index, $event)">
          <span class="text" border-1px>
            <support-ico :size=3 :type="goods.type"></support-ico>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <div class="list-wrapper">
        <ul class="foods-title">
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul class="foods-li">
            <li v-for="food in item.foods" :key="food.index" class="food-item" border-1px>
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old">¥{{ food.oldPrice }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      </div>
    </div>
    <shop-cart></shop-cart>
  </div>
</template>

<script>
import { getGoods } from '@/api/index'
import SupportIco from '@/components/support-ico/support-ico'
import BScroll from 'better-scroll'
import ShopCart from '@/components/shopCart/ShopCart'

export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  created() {
    this._getGoods()
    this.$nextTick(() => {
      this._initscroll()
      this._calculateHeight()
    })
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    _getGoods() {
      getGoods().then(goods => {
        this.goods = goods
        console.log(goods)
      })
    },
    _initscroll() {
      this.menuScroll = new BScroll(this.$refs.foodWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3
      })
      this.foodSscroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    SupportIco,
    ShopCart
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
.goods
  display: flex
  position: absolute
  top: 174px
  bottom: 46px
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .goods-li
      padding-inline-start: 0
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.curernt
          position: relative
          z-index: 10
          margin-top: -1px
          background : #ffffff
          font-weight: 700
          .text
            border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
  .foods-wrapper
    flex: 1
    .foods-title
      margin-top: 0
      padding-inline-start: 0
      .food-list
        padding-inline-start: 0
        list-style: none
        .title
          margin: 0
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #f3f5f7
        .foods-li
          padding-inline-start: 0
          list-style: none
          .food-item
            display: flex
            margin: 18px
            padding-bottom: 18px
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              border-none()
            .icon
              flex: 0 0 57px
              margin-right: 10px
            .content
              flex: 1
              .name
                margin: 2px 0 8px 0
                height: 14px
                line-height: 14px
                font-size: 14px
                color: rgb(7, 17, 27)
              .desc
                margin-bottom: 8px
                line-height: 12px
                font-size: 10px
                color: rbg(147, 153, 159)
              .extra
                  margin-right: 12px
                  font-size: 12px
                  .count
                    margin-right: 12px
              .price
                font-weight: 700
                line-height: 24px
                .now
                  margin-right: 8px
                  font-size: 14px
                  color: rgb(240, 20, 20)
                .old
                  text-decoration: line-through
                  font-size: 10px
                  color: rgb(147, 153, 159)
</style>
