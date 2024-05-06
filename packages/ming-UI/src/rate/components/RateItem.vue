<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { rateItemProps } from '../interface.ts'
import DefaultRateIcon from './defaultRateIcon.vue'

defineOptions({
  name: 'RateItem',
})
const props = withDefaults(defineProps<rateItemProps>(), {
  score: 0,
  size: 20,
  iconComponent: DefaultRateIcon,
  fillColor: '#F7BA2A',
  stroke: '#d3d6db',
  bottomLayerFillColor: 'none',
  strokeWidth: 2,
  allowHalf: false,
  max: 10,
  rateIconCount: 5,
  grayscale: 0,
  disabled: false,
})

const emit = defineEmits(['update:score'])

onMounted(() => {
  initSvgContainer()
})

const clipWidth = computed(() => {
  return scoreConvertToClipWidth(props.score)
})

type svgContainerType = HTMLDivElement | null
const svgContainerRef = ref<svgContainerType>(null)

function initSvgContainer() {
  if (!svgContainerRef.value)
    return
  const svgContainer = svgContainerRef.value.style
  svgContainer.width = `${props.size}px`
  svgContainer.height = `${props.size}px`

  if (props.disabled)
    svgContainer.cursor = 'default'
}

const maximumScore = computed(() => {
  return props.max / props.rateIconCount
})
const isFull = ref<boolean>(false)
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
    if (score === maximumScore.value)
      isFull.value = true
    else isFull.value = false
  }

  return clipWidth
}

function clamp(value: number, max: number): number {
  return Math.min(Math.max(value, 0), max)
}
function mark(e: MouseEvent) {
  if (props.disabled)
    return
  if (!svgContainerRef.value)
    return

  const svgContainerRect = svgContainerRef.value!.getBoundingClientRect()
  const currentMousePosition = clamp(e.clientX - svgContainerRect.left, svgContainerRect.width)

  let score = 0
  if (props.allowHalf) {
    const halfBoundary = props.size / 2

    if (currentMousePosition < halfBoundary)
      score = maximumScore.value / 2
    else
      score = maximumScore.value
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
    score = (approximateValue / svgContainerRect.width * maximumScore.value)
  }

  emit('update:score', score)
}
const bottomLayerDynamicStyle = computed(() => {
  const style = {
    fill: props.bottomLayerFillColor,
    stroke: '',
    filter: 'grayscale(0)',
  }
  if (isFull.value)
    style.stroke = props.fillColor
  else
    style.stroke = props.stroke

  if (props.grayscale !== 0)
    style.filter = `grayscale(${props.grayscale})`
  if (props.stroke === 'none') {
    style.filter = `grayscale(${props.grayscale || 0.5})`
    style.fill = props.bottomLayerFillColor === 'none' ? props.fillColor : props.bottomLayerFillColor
  }

  return style
})

const upperLayerDynamicStyle = computed(() => {
  const style = {
    fill: props.fillColor,
    stroke: '',
  }
  if (isFull.value)
    style.stroke = props.fillColor
  else
    style.stroke = props.stroke

  return style
})
</script>

<template>
  <div ref="svgContainerRef" class="svg-container" @click="mark($event)">
    <svg width="0" height="0">
      <defs>
        <clipPath :id="`${id}`">
          <rect :width="clipWidth" :height="size" />
        </clipPath>
      </defs>
    </svg>
    <component :is="iconComponent" :style="{ ...bottomLayerDynamicStyle }" class="init-svg" />
    <component :is="iconComponent" class="init-svg " :style="{ 'clip-path': `url(#${id})`, ...upperLayerDynamicStyle }" />
  </div>
</template>

<style scoped>
.init-svg {
  stroke-width: v-bind(strokeWidth);
  position: absolute;
  width: v-bind(`${size}px`);
  height: v-bind(`${size}px`);
}
.svg-container {
  position: relative;
  transition: all .3s ease-in-out;
  cursor: pointer;
}
.svg-container:hover {
  transform: scale(1.1);
}
</style>
