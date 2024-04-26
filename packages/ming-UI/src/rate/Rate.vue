<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { nanoid } from 'nanoid'
import type { rateProps } from './interface.ts'
import like from './like.vue'

defineOptions({
  name: 'MRate',
})
const props = withDefaults(defineProps<rateProps>(), {
  modelValue: 10,
  size: 20,
  iconComponent: like,
  fillColor: 'gold',
  stroke: '#333',
  bottomLayerFillColor: (props) => {
    // 这里不知道为什么props.stroke永远为undefined，打印其他prop都是正常的，因此这里将计就计
    if (props.stroke)
      return 'none'
    else return 'gray'
  },
  strokeWidth: 2,
  allowHalf: true,
  max: 10,
  rateIconCount: 5,
})

const svgContainerRef = ref<HTMLDivElement | null>(null)
const iconRef = ref<InstanceType<typeof props.iconComponent>>(null)
const clipId = ref(nanoid())
// const clipWidth = computed(() => `${props.rating / props.maxRating * 100}%`)
const clipWidth = ref<number>(0)
const isFull = ref<boolean>(false)
const strokeColor = computed(() => {
  if (isFull.value)
    return props.fillColor
  else return props.stroke
})
onMounted(() => {
  initSvgContainer()
  generateScoreArr(props.modelValue)
})
function initSvgContainer() {
  if (svgContainerRef.value === null)
    return

  svgContainerRef.value.style.width = `${props.size}px`
  svgContainerRef.value.style.height = `${props.size}px`
}
function currentPosition(e: MouseEvent) {
  if (svgContainerRef.value === null)
    return
  const svgContainerRect = svgContainerRef.value?.getBoundingClientRect()
  if (props.allowHalf) {
    const halfBoundary = props.size / 2
    console.log(e.offsetX, halfBoundary)

    if (e.offsetX <= halfBoundary) {
      clipWidth.value = halfBoundary
      isFull.value = false
    }
    else {
      clipWidth.value = props.size
      isFull.value = (props.stroke !== 'none')
    }
  }
  else {
    clipWidth.value = e.offsetX

    if (e.offsetX >= svgContainerRect.width - 2 && props.stroke !== 'none')
      isFull.value = true
    else isFull.value = false
  }
}
const maximumScore = computed(() => {
  return props.max / props.rateIconCount
})
function generateScoreArr(scoreValue: number) {
  console.log(scoreValue)

  const scoreArr = []
  for (let i = 0; i < props.rateIconCount; i++) {
    let score = 0
    if (scoreValue - maximumScore.value * i > 0)
      score = maximumScore.value
    else score = scoreValue - maximumScore.value * i
    const scoreObj = {
      id: i,
      score,
    }
    scoreArr.push(scoreObj)
    console.log(scoreObj)
  }
  return scoreArr
}
</script>

<template>
  <div class="rate">
    <svg width="0" height="0">
      <defs>
        <clipPath :id="clipId">
          <rect :width="clipWidth" :height="size" />
        </clipPath>
      </defs>
    </svg>
    <div class="svg-container" @click="currentPosition">
      <component :is="iconComponent" ref="iconRef" class="init-svg lower-svg" :class="stroke !== 'none' ? 'stroke' : ''" />
      <component :is="iconComponent" class="init-svg  clip-color upper-svg" :class="stroke !== 'none' ? 'stroke' : ''" :style="{ 'clip-path': `url(#${clipId})` }" />
    </div>
  </div>
</template>

<style>
.init-svg {
  stroke-width: v-bind(strokeWidth);
  position: absolute;
  width: v-bind(`${size}px`);
  height: v-bind(`${size}px`);
  fill: gray;
}
.svg-container {
  position: relative;
}

.clip-color {
  fill: v-bind(fillColor);
}

.stroke {
  stroke: v-bind(strokeColor);
}
.lower-svg {

    fill: v-bind(bottomLayerFillColor);

}
.lower-svg-filter {
  filter: grayscale(50%);
}
</style>
