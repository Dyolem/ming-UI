<script setup>
import { ref } from 'vue'

const scoreOne = ref(2.33333333333)
const scoreTwo = ref(3.25)
const scoreThree = ref(4.344)
</script>

<template>
  <div class="container">
    <div class="default">
      <MRate v-model="scoreOne" />
      <span>实际值：{{ scoreOne }}</span>
    </div>
    <MRate v-model="scoreTwo" :score-accuracy="2" />
    <MRate v-model="scoreThree" :score-accuracy="3" />
  </div>
</template>

<style scoped>
    .default {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
</style>
