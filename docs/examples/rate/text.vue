<script setup lang="ts">
import { ref } from 'vue'

const score = ref(2)
function generateText(score: number) {
  if (score <= 4)
    return 'bad'
  else if (score > 4 && score < 9)
    return 'normal'
  else return 'good'
}
</script>

<template>
  <MRate v-model="score" :allow-half="true" :fill-color="['#99A9BF', '#F7BA2A', '#ff9900']" :low-threshold="2" :high-threshold="4">
    <template #text="{ templateScore }">
      <div style="color: goldenrod;">
        {{ `${templateScore}points` }}
      </div>
    </template>
  </MRate>
  <div class="auxiliary-text">
    <MRate v-model="score" :allow-half="true" :fill-color="['#99A9BF', '#F7BA2A', '#ff9900']" :low-threshold="2" :high-threshold="4">
      <template #text="{ templateScore }">
        <div style="color: goldenrod;">
          {{ generateText(templateScore) }}
        </div>
      </template>
    </MRate>
  </div>
</template>
