<script setup>
import { ref } from 'vue'
import { Like } from '@ming-UI/icons'

const score = ref(3)
const color = ref('pink')
</script>

<template>
  <MRate v-model="score" :icon-component="Like" :allow-half="true" stroke="none" :bottom-layer-fill-color="color" :grayscale="0.6" fill-color="pink">
    <template #text="{ templateScore }">
      <div class="text">
        {{ `${templateScore}points` }}
      </div>
    </template>
  </MRate>
</template>

<style scoped>
    .text {
        color: v-bind(color);
    }
</style>
