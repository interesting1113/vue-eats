<template>
  <div class="star">
    <span class="star-item"
          v-for="(itemClass, index) in itemClass"
          :key="index"
          :class="itemClass">
    </span>
  </div>
</template>

<script>
// star length
const LENGTH = 5

// star status
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClass() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      // half star
      let hasDecimal = score % 1 !== 0
      // full star
      let integer = Math.floor(score)

      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // deal with half star
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }

}
</script>

<style scoped>
.star{
  font-size: 0;
}
.star .star-item{
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
}
.star .star-item:last-child{
  margin-right: 0;
}

/* 三种图片类型*/
.star .on{
  background-image: url(img/star24_on@2x.png);
}
.star .half{
  background-image: url(img/star24_half@2x.png);
}
.star .off{
  background-image: url(img/star24_off@2x.png);
}

</style>