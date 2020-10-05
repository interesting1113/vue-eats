<template>
  <div class="cart-control">
    <div class="cart-decrease icon-remove_circle_outline"
         @click="decreaseCart"></div>
    <div class="cart-count">7</div>
    <div class="cart-add icon-add_circle"
         @click="increaseCart">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    decreaseCart() {
      this.food.count--
    },
    increaseCart() {
      this.food.count++
    }
  }
}
</script>

<style scoped>
.cart-control{
  font-size: 0;
}

.cart-control .cart-decrease{
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #b4b4b4;
}

.cart-control .cart-add .bg{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  position: absolute;
  left: 3px;
  top: 3px;
  z-index: -1;
}

.cart-control .cart-count{
  display: inline-block;
  width: 25px;
  text-align: center;
  font-size: 12px;
  line-height: 26px;
  vertical-align: top;
}

.cart-control .cart-add{
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #ffd161;
  position: relative;
}

.move-enter-active,.move-leave-active{
  transition: all 0.5s linear;
}
.move-enter,.move-leave-to{
  transform: translateX(20px) rotate(180deg);
}

</style>