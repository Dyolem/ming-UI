<script setup lang="ts">
import { computed, ref } from 'vue'
import type { rateProps } from './interface.ts'
import RateItem from './components/RateItem.vue'

defineOptions({
  name: 'MRate',
})
const props = withDefaults(defineProps<rateProps>(), {
  modelValue: 10,
  max: 10,
  rateIconCount: 5,
})
const emit = defineEmits(['update:modelValue'])

const maximumScore = computed(() => {
  return props.max / props.rateIconCount
})

const scoreArr = ref([{
  id: 0,
  score: 2,
}, {
  id: 1,
  score: 2,
}, {
  id: 2,
  score: 1,
}, {
  id: 3,
  score: 0,
}, {
  id: 4,
  score: 0,
}])

function getCurrentScore(index: number, currentScore: number) {
  // const beforeScoreArr = []
  // for (let i = 0; i < index; i++)
  //   beforeScoreArr.push(maximumScore.value)
  // const initialValue = 0
  // const totalScore = beforeScoreArr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue) + currentScore
  let totalScore = 0
  for (let i = 0; i < index; i++)
    totalScore += maximumScore.value

  totalScore += currentScore
  return totalScore
}

function generateScoreArr(totalScore: number) {
  let residualScore = totalScore
  const scoreArr = []

  for (let i = 0; i < props.rateIconCount; i++) {
    let score = 0
    if (residualScore >= maximumScore.value)
      score = maximumScore.value
    else score = residualScore

    residualScore = residualScore - score

    const scoreObj = {
      id: i,
      score,
    }
    scoreArr.push(scoreObj)
  }
  return scoreArr
}

function updateScoreArr(score: number, index: number) {
  const newTotalScore = getCurrentScore(index, score)
  scoreArr.value = generateScoreArr(newTotalScore)
  emit('update:modelValue', newTotalScore)
}
</script>

<template>
  <div class="rate">
    <span>{{ modelValue }}</span>
    <RateItem
      v-for="(item, index) in scoreArr" :id="item.id" :key="item.id" :score="item.score" :allow-half="allowHalf" :stroke-width="strokeWidth" :stroke="stroke" :size="size" :bottom-layer-fill-color="bottomLayerFillColor" :fill-color="fillColor" :icon-component="iconComponent"
      :max="max" :rate-icon-count="rateIconCount" :grayscale="grayscale" @update:score="value => updateScoreArr(value, index)"
    />
  </div>
</template>

<style>
.rate {
  padding: 0 5px;
  width: 200px;
  display: flex;
  justify-content: space-between;
}
</style>
