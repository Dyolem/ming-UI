<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'

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
})
const emit = defineEmits(['update:modelValue'])

type svgContainerType = HTMLDivElement | null
const svgContainerRef = ref<svgContainerType[]>([])
const iconRef = ref<InstanceType<typeof props.iconComponent>>(null)
// const clipId = ref(nanoid())
// const clipWidth = computed(() => `${props.rating / props.maxRating * 100}%`)

const isFull = ref<boolean>(false)
const strokeColor = computed(() => {
  if (isFull.value)
    return props.fillColor
  else return props.stroke
})

interface clipWidthArrType {
  id: number
  clipWidth: number
  score: number
}
const clipWidthArr = ref<Array<clipWidthArrType>>([])
const maximumScore = computed(() => {
  return props.max / props.rateIconCount
})

onMounted(async () => {
  await nextTick()
  console.log(svgContainerRef.value.length)

  initSvgContainer()
  clipWidthArr.value = generateClipWidthArr(props.modelValue)
  watch(() => props.modelValue, (newVal) => {
    clipWidthArr.value = generateClipWidthArr(newVal)
  })
})
function initSvgContainer() {
  // if (!svgContainerRef.value.length)
  //   return
  console.log(svgContainerRef.value, svgContainerRef.value.length)

  for (const svgContainer of (svgContainerRef.value)) {
    console.log(svgContainer)
    if (!svgContainer)
      return
    svgContainer.style.width = `${props.size}px`
    console.log(svgContainer.style.width)

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

function mark(index: number, e: MouseEvent) {
  if (!svgContainerRef.value.length)
    return
  if (svgContainerRef.value[index] === null)
    return
  const svgContainerRect = svgContainerRef.value[index]!.getBoundingClientRect()
  let score = 0
  if (props.allowHalf) {
    const halfBoundary = props.size / 2

    if (e.offsetX < halfBoundary) {
      // clipWidth.value = halfBoundary
      score = maximumScore.value / 2
      console.log(score)

      clipWidthArr.value[index].score = score
      // isFull.value = false
    }
    else {
      // clipWidth.value = props.size
      score = maximumScore.value
      clipWidthArr.value[index].score = score

      // isFull.value = (props.stroke !== 'none')
    }
  }
  else {
    // clipWidth.value = e.offsetX
    score = e.offsetX / svgContainerRect.width * maximumScore.value
    console.log(e.offsetX, svgContainerRect.width)

    clipWidthArr.value[index].score = score
    // if (e.offsetX >= svgContainerRect.width - 2 && props.stroke !== 'none')
    //   isFull.value = true
    // else isFull.value = false
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
// function clipWidthConvertToScore(widthArr: clipWidthArrType[]) {
//   let totalWidth = 0
//   for (const item of widthArr)
//     totalWidth += item.clipWidth
// }
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
})
function generateClipWidthArr(scoreValue: number) {
  let residualScore = scoreValue
  const clipWidthArr = []

  for (let i = 0; i < props.rateIconCount; i++) {
    let score = 0

    if (residualScore >= maximumScore.value)
      score = maximumScore.value
    else
      score = residualScore

    residualScore = residualScore - score

    scoreObj.value = {
      id: i,
      clipWidth: scoreConvertToClipWidth(score),
      score,
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
      <component :is="iconComponent" ref="iconRef" class="init-svg lower-svg" :class="stroke !== 'none' ? 'stroke' : ''" />
      <component :is="iconComponent" class="init-svg  clip-color upper-svg" :class="stroke !== 'none' ? 'stroke' : ''" :style="{ 'clip-path': `url(#${item.id})` }" />
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
