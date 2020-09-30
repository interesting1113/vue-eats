<template>
  <transition>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper" clearfix>
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close"></i>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
          <support-ico :size=2 type="seller.supports[$index].type"></support-ico>
          <span class="text">{{seller.supports[$index].description}}</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import SupportIco from '@/components/support-ico/support-ico'
import Star from '@/components/star/Star'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    SupportIco,
    Star
  }
}
</script>

<style lang="stylus" scoped>
.detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow: auto
  background: rgba(7, 17, 27, 0.8)
  .detail-wrapper
    width: 100%
    min-height: 100%
    .detail-main
      margin-top: 64px
      padding-bottom: 64px
      .name
        line-height: 16px
        text-align: center
        font-size: 16px
        font-weight: 700
      .star-wrapper
        margin-top: 18px
        padding: 2px 0
        text-align: center
      .title
        display: flex
        width: 80%
        margin: 28px auto 20px auto
      .line
        flex: 1
        position: relative
        top: -6px
        border-bottom: 1px solid rgba(255, 255, 255, 0.2)
      .text
        padding: 0 12px
        font-weight: 700
        font-size: 14px

</style>
