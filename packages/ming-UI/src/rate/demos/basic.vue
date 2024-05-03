<script setup>
import { ref } from 'vue'
import { BookMarkOne, Like, Star } from '../../../../icons/src/index.ts'

const icon = [Star, Like, BookMarkOne]
const score = ref(2)
</script>

<template>
  <span>{{ score }}</span>
  <MRate v-model="score" :clearable="true" :allow-half="true" :rate-icon-count="4" :fill-color="['#99A9BF', '#F7BA2A']" :low-threshold="2" :high-threshold="3" :icon-component="icon">
    <template #default="{ templateScore }">
      {{ templateScore + 1 }}
    </template>
  </MRate>
</template>
