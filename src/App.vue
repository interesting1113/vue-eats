<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link  tag="a" to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" to='/ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" to='/seller'>商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import VHeader from './components/header/VHeader'
import { getSeller } from './api/index'
export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller().then(seller => {
        this.seller = seller
      })
    }
  },
  components: {
    VHeader
  }
}
</script>

<style lang="stylus">
@import './common/stylus/mixin.styl'
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        text-decoration: none
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
