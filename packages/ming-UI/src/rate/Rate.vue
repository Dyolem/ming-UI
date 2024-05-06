<script setup lang="ts">
import type { Component } from 'vue'
import { computed, ref, shallowRef, watchEffect } from 'vue'
import type { rateProps } from './interface.ts'
import RateItem from './components/RateItem.vue'
import defaultRateIcon from './components/defaultRateIcon.vue'

defineOptions({
  name: 'MRate',
})
const props = withDefaults(defineProps<rateProps>(), {
  modelValue: 10,
  max: 10,
  rateIconCount: 5,
  fillColor: '#F7BA2A',
  iconComponent: defaultRateIcon,
  clearable: false,
  lowThreshold: 2,
  highThreshold: 3,
  thresholdArr: () => [],
  scoreAccuracy: 1,
  disabled: false,
  textPosition: 'right',
})
const emit = defineEmits(['update:modelValue'])
const templateScore = computed(() => {
  return Number(props.modelValue.toFixed(Math.abs(props.scoreAccuracy)))
})
const maximumScore = computed(() => {
  return props.max / props.rateIconCount
})

const textPosition = computed(() => {
  const flexDirectionMap = new Map([['left', 'row-reverse'], ['right', 'row'], ['top', 'column-reverse'], ['bottom', 'column']])
  let flexDirection = flexDirectionMap.get(props.textPosition)
  if (flexDirection === undefined)
    flexDirection = 'row'
  return flexDirection
})

type scoreAndStyleArrType = Array<{ id: number;score: number;fillColor: string;iconComponent: Component }>
const scoreArr = ref<scoreAndStyleArrType>([])

const rateIconCount = computed(() => {
  let rateIconCount = 0
  if (typeof props.rateIconCount !== 'number') {
    rateIconCount = 5
  }
  else {
    rateIconCount = Math.ceil(props.rateIconCount)
    if (rateIconCount <= 0)
      rateIconCount = 5
  }

  return rateIconCount
})
const thresholdArr = computed(() => {
  if (props.rateIconCount === 1)
    return []
  if (!props.thresholdArr.length)
    return [0, Math.abs(props.lowThreshold), Math.abs(props.highThreshold)].sort((a, b) => a - b)
  else return [0, ...props.thresholdArr].sort((a, b) => a - b)
})
const fillColor = computed(() => {
  const colorArr = [props.fillColor].flat()
  if (colorArr.length === 0)
    colorArr.push('#F7BA2A')

  if (colorArr.length >= thresholdArr.value.length)
    return colorArr.slice(0, thresholdArr.value.length)
  else return [...colorArr]
})

const iconComponent = computed(() => {
  const iconArr = [props.iconComponent].flat()
  if (iconArr.length === 0)
    iconArr.push(defaultRateIcon)

  if (iconArr.length >= thresholdArr.value.length)
    return iconArr.slice(0, thresholdArr.value.length)
  else return [...iconArr]
})

watchEffect(() => {
  scoreArr.value = generateScoreArr(props.modelValue)
})

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

function distributeColor(scoreArr: scoreAndStyleArrType) {
  const scoreAndStyleArr: scoreAndStyleArrType = []
  let lastFillIndex = scoreArr.findIndex(item => item.score === 0)

  if (lastFillIndex === -1)
    lastFillIndex = scoreArr.length - 1
  else lastFillIndex -= 1

  let thresholdIndex = thresholdArr.value.findLastIndex(item => lastFillIndex >= item)
  if (thresholdIndex === -1)
    thresholdIndex = thresholdArr.value.length - 1

  if (fillColor.value.length - 1 < thresholdIndex)
    thresholdIndex = fillColor.value.length - 1

  for (const scoreObj of scoreArr)
    scoreAndStyleArr.push({ ...scoreObj, fillColor: fillColor.value[thresholdIndex], iconComponent: shallowRef(iconComponent.value[thresholdIndex]) })

  return scoreAndStyleArr
}
function generateScoreArr(totalScore: number) {
  let residualScore = totalScore
  const scoreArr = []

  for (let i = 0; i < rateIconCount.value; i++) {
    let score = 0
    if (residualScore >= maximumScore.value)
      score = maximumScore.value
    else score = residualScore

    residualScore = residualScore - score

    const scoreObj = {
      id: i,
      score,
      fillColor: '',
      iconComponent: defaultRateIcon,
    }
    scoreArr.push(scoreObj)
  }
  const scoreAndStyleArr = distributeColor(scoreArr)

  return scoreAndStyleArr
}

const lastTotalScore = ref(0)
function updateScoreArr(score: number, index: number) {
  let newTotalScore = getCurrentScore(index, score)
  if (props.clearable) {
    if (lastTotalScore.value === newTotalScore)
      newTotalScore = 0

    lastTotalScore.value = newTotalScore
  }
  emit('update:modelValue', newTotalScore)
}
</script>

<template>
  <div class="rate">
    <div class="rate-items">
      <RateItem
        v-for="(item, index) in scoreArr" :id="item.id" :key="item.id" :score="item.score" :allow-half="allowHalf" :stroke-width="strokeWidth" :stroke="stroke" :size="size" :bottom-layer-fill-color="bottomLayerFillColor" :fill-color="item.fillColor" :icon-component="item.iconComponent"
        :max="max" :rate-icon-count="rateIconCount" :grayscale="grayscale" :disabled="disabled" @update:score="value => updateScoreArr(value, index)"
      />
    </div>
    <slot name="text" :template-score="templateScore">
      <span>{{ templateScore }}</span>
    </slot>
  </div>
</template>

<style>
.rate {
  width: fit-content;
  padding: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: v-bind(textPosition);
}
.rate-items {
  display: flex;
  gap: 10px;
  margin:0 20px;
}
</style>
