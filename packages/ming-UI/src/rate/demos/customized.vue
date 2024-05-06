<script setup>
import { ref } from 'vue'
import { BookMarkOne, Like, Star } from '../../../../icons/src/index.ts'

const icon = [Star, Like, BookMarkOne]
const score = ref(2)
</script>

<template>
  <span>{{ score }}</span>
  <MRate v-model="score" :clearable="true" :allow-half="true" :rate-icon-count="4" :fill-color="['#99A9BF', '#F7BA2A']" :low-threshold="2" :high-threshold="3" :icon-component="icon" :disabled="true" text-position="lef">
    <template #text="{ templateScore }">
      <div style="color: aquamarine;">
        {{ templateScore + 1 }}
      </div>
    </template>
  </MRate>
</template>
