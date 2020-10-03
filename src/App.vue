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
          console.log(res.data)
          console.log(res.data.code)
          console.log(res.data.msg)
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
