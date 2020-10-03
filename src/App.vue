<template>
  <div id="app">
    <v-header :poiInfo="poiInfo"></v-header>
    <v-nav></v-nav>
    <router-view/>
  </div>
</template>

<script>
import VHeader from './components/header/VHeader'
import VNav from './components/nav/Nav'
export default {
  name: 'App',
  data() {
    return {
      poiInfo: {}
    }
  },
  created() {
    this.getGoods()
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
