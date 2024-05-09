<script setup>
import { ref } from 'vue'

const scoreOne = ref(2)
const scoreTwo = ref(2)
const scoreThree = ref(2)
</script>

<template>
  <div class="container">
    <div class="default-box">
      <span>default</span>
      <MRate v-model="scoreOne" />
    </div>
    <div class="threshold-box">
      <span>different levels</span>
      <MRate v-model="scoreTwo" :fill-color="['#99A9BF', '#F7BA2A', '#ff9900']" :low-threshold="2" :high-threshold="4" />
    </div>
    <div class="threshold-box">
      <span>more levels</span>
      <MRate v-model="scoreThree" :fill-color="['#99A9BF', '#F7BA2A', '#ff9900', '#ff6700']" :threshold-arr="[2, 3, 4]" />
    </div>
  </div>
</template>

<style scoped>
.default-box, .threshold-box {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
