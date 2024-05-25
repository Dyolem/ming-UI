<script setup>
import { ref } from 'vue'

const backgroundStyleF = {
  width: '200px',
  height: '50px',
  backgroundColor: '#e9eaff',
}

const backgroundStyleS = {
  width: '200px',
  height: '50px',
  backgroundColor: 'antiquewhite',
  borderRadius: '8px',
}
const backgroundStyleT = {
  background: `linear-gradient(to right,
    #ff0000 0%, #ffff00 17%, #00ff00 33%,
    #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`, // 背景颜色
  borderRadius: '5px',
  width: '180px', // 内边距
  height: '30px',
}
const initRatio = ref({
  horizontalDistanceRatio: 20,
})
</script>

<template>
  <div class="container">
    <MControlPanel v-model="initRatio" :background-style="backgroundStyleF" />
    <MControlPanel v-model="initRatio" :background-style="backgroundStyleS" />
    <MControlPanel v-model="initRatio" :background-style="backgroundStyleT" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
}
</style>
