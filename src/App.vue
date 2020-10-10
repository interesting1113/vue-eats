<template>
  <div id="app">
    <v-header :poiInfo="poiInfo"></v-header>
    <v-nav :commentNum="commentNum"></v-nav>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from './components/header/VHeader'
import VNav from './components/nav/Nav'
export default {
  name: 'App',
  data() {
    return {
      poiInfo: {},
      commentNum: 0
    }
  },
  created() {
    this.getGoods()
    this.getRatings()
  },
  methods: {
    getGoods() {
      this.$axios.get('api/goods')
        .then(res => {
          const { data } = res.data
          if (data.code === 0) {
            this.poiInfo = data.data.poi_info
          }
        })
    },
    getRatings() {
      this.$axios.get('api/ratings')
        .then(res => {
          const { data } = res.data
          if (data.code === 0) {
            this.commentNum = data.data.comment_num
          }
        })
    }
  },
  components: {
    VHeader,
    VNav
  }
}
</script>

<style scoped>
</style>
