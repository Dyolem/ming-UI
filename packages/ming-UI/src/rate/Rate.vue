<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

// import { nanoid } from 'nanoid'
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
  grayscale: 0,
})
const emit = defineEmits(['update:modelValue'])

type svgContainerType = HTMLDivElement | null
const svgContainerRef = ref<svgContainerType[]>([])
const iconRef = ref<InstanceType<typeof props.iconComponent>>(null)
// const clipId = ref(nanoid())

const isFull = ref<boolean>(false)

interface clipWidthArrType {
  id: number
  clipWidth: number
  score: number
  strokeColor: string
}
const clipWidthArr = ref<Array<clipWidthArrType>>([])
const maximumScore = computed(() => {
  return props.max / props.rateIconCount
})

onMounted(async () => {
  clipWidthArr.value = generateClipWidthArr(props.modelValue)
  await nextTick()
  initSvgContainer()
  watch(() => props.modelValue, (newVal) => {
    clipWidthArr.value = generateClipWidthArr(newVal)
  })
})
function initSvgContainer() {
  if (!svgContainerRef.value.length)
    return

  for (const svgContainer of (svgContainerRef.value)) {
    if (!svgContainer)
      return
    svgContainer.style.width = `${props.size}px`
    svgContainer.style.height = `${props.size}px`
  }
}

function updateClipWidthArr(index: number) {
  const newArr = clipWidthArr.value.map((item, i) => {
    if (i < index)
      return { ...item, score: maximumScore.value }
    else if (i > index)
      return { ...item, score: 0 }
    else
      return item
  })

  clipWidthArr.value = newArr
}

function clamp(value: number, max: number): number {
  return Math.min(Math.max(value, 0), max)
}
function mark(index: number, e: MouseEvent) {
  if (!svgContainerRef.value.length)
    return
  if (svgContainerRef.value[index] === null)
    return
  const svgContainerRect = svgContainerRef.value[index]!.getBoundingClientRect()
  const currentMousePosition = clamp(e.clientX - svgContainerRect.left, svgContainerRect.width)

  let score = 0
  if (props.allowHalf) {
    const halfBoundary = props.size / 2

    if (currentMousePosition < halfBoundary) {
      score = maximumScore.value / 2
      clipWidthArr.value[index].score = score
    }
    else {
      score = maximumScore.value
      clipWidthArr.value[index].score = score
    }
  }
  else {
    let approximateValue = 0
    const leftApproximation = 2
    const rightApproximation = 4

    if (currentMousePosition <= leftApproximation)
      approximateValue = 0
    else if (svgContainerRect.width - currentMousePosition <= rightApproximation)
      approximateValue = svgContainerRect.width
    else approximateValue = currentMousePosition
    score = Number((approximateValue / svgContainerRect.width * maximumScore.value).toFixed(1))
    clipWidthArr.value[index].score = score
  }
  updateClipWidthArr(index)
  emit('update:modelValue', getAllScore())
}

function getAllScore() {
  let totalScore = 0
  for (const item of clipWidthArr.value)
    totalScore += item.score
  return totalScore
}

function scoreConvertToClipWidth(score: number) {
  let clipWidth = 0
  if (props.allowHalf) {
    const scoreBoundary = maximumScore.value / 2
    if (score > scoreBoundary) {
      isFull.value = true
      clipWidth = props.size
    }

    else if (score > 0 && score <= scoreBoundary) {
      isFull.value = false
      clipWidth = props.size / 2
    }

    else {
      isFull.value = false
      clipWidth = 0
    }
  }
  else {
    clipWidth = score / maximumScore.value * props.size
  }
  return clipWidth
}

const scoreObj = ref<clipWidthArrType>({
  id: 0,
  clipWidth: 0,
  score: 0,
  strokeColor: props.stroke,
})
function generateClipWidthArr(totalScore: number) {
  let residualScore = totalScore
  const clipWidthArr = []

  for (let i = 0; i < props.rateIconCount; i++) {
    let score = 0
    let strokeColor = props.stroke
    if (residualScore >= maximumScore.value) {
      score = maximumScore.value
      strokeColor = props.fillColor
    }

    else { score = residualScore }

    residualScore = residualScore - score

    scoreObj.value = {
      id: i,
      clipWidth: scoreConvertToClipWidth(score),
      score,
      strokeColor,
    }

    clipWidthArr.push(scoreObj.value)
  }
  return clipWidthArr
}
</script>

<template>
  <div class="rate">
    <span>{{ modelValue }}</span>
    <div v-for="(item, index) in clipWidthArr" ref="svgContainerRef" :key="item.id" class="svg-container" @click="mark(index, $event)">
      <svg width="0" height="0">
        <defs>
          <clipPath :id="`${item.id}`">
            <rect :width="item.clipWidth" :height="size" />
          </clipPath>
        </defs>
      </svg>
      <component :is="iconComponent" ref="iconRef" :style="{ stroke: item.strokeColor }" class="init-svg lower-svg" :class="{ grayscale: grayscale !== 0 }" />
      <component :is="iconComponent" class="init-svg  clip-color" :style="{ 'clip-path': `url(#${item.id})`, 'stroke': item.strokeColor }" />
    </div>
  </div>
</template>

<style>
.rate {
  padding: 0 5px;
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.init-svg {
  stroke-width: v-bind(strokeWidth);
  position: absolute;
  width: v-bind(`${size}px`);
  height: v-bind(`${size}px`);
  fill: gray;
}
.svg-container {
  position: relative;
  transition: all .3s ease-in-out;
}
.svg-container:hover {
  transform: scale(1.1);
}

.clip-color {
  fill: v-bind(fillColor);
}

.lower-svg {

    fill: v-bind(bottomLayerFillColor);

}
.lower-svg-filter {
  filter: grayscale(50%);
}
</style>
