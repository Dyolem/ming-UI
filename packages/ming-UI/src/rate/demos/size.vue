<script setup>
import { ref } from 'vue'

const score = ref(2)
</script>

<template>
  <div class="size-box">
    <MRate v-model="score" :size="14" />
    <MRate v-model="score" :size="18" />
    <MRate v-model="score" :size="22" />
  </div>
</template>

<style scoped>
    .size-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
