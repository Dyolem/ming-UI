<script setup lang="ts">
import { onMounted, ref, useAttrs, watch } from 'vue'
import type { ControlPanelProps } from './interface'

defineOptions({
  name: 'MControlPanel',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<ControlPanelProps>(), {
  vertical: false,
  backgroundStyle: undefined,
  distanceRatio: 0,
  dimensionalMovement: false,
  modelValue: () => ({
    traveledDistance: 0,
    verticalToTraveledDistance: 0,
  }),
})

const emit = defineEmits(['update:modelValue'])
const backgroundBoardRef = ref<HTMLDivElement>()
const sliderRef = ref<HTMLDivElement>()
const placeholderBoxRef = ref<HTMLDivElement>()

const travelMax = ref(0)
const verticalMax = ref(0)
watch(() => props.modelValue, (newVal) => {
  // 确保传入的移动距离在合法范围内
  const traveledDistance = Math.min(Math.max(newVal.traveledDistance, 0), travelMax.value)
  const verticalToTraveledDistance = Math.min(Math.max(newVal.verticalToTraveledDistance, 0), verticalMax.value)

  if (props.dimensionalMovement)
    sliderRef.value!.style.transform = `translate(${traveledDistance}px,${verticalToTraveledDistance}px)`

  else sliderRef.value!.style.transform = `translate(${traveledDistance}px,0)`
}, { deep: true })

onMounted(() => {
  travelMax.value = backgroundBoardRef.value!.getBoundingClientRect().width
  verticalMax.value = backgroundBoardRef.value!.getBoundingClientRect().height
  initSliderPosition()
})

defineExpose({
  travelMax,
  verticalMax,
})

function initSliderPosition() {
  const backgroundBoardRect = backgroundBoardRef.value!.getBoundingClientRect()
  const sliderRect = sliderRef.value!.getBoundingClientRect()
  let top = (backgroundBoardRect.height - sliderRect.height) / 2
  const left = -sliderRect.width / 2
  if (props.dimensionalMovement)
    top = -sliderRect.height / 2
  backgroundBoardRef.value!.style.transformOrigin = `${backgroundBoardRect.height / 2}px ${backgroundBoardRect.height / 2}px`
  sliderRef.value!.style.top = `${top}px`
  sliderRef.value!.style.left = `${left}px`
  if (props.vertical) {
    backgroundBoardRef.value!.style.transform = `rotate(90deg)`
    placeholderBoxRef.value!.style.height = `${backgroundBoardRect.width}px`
    placeholderBoxRef.value!.style.width = `${backgroundBoardRect.height}px`
  }
}

function updateSliderPosition(e: Event) {
  let traveledDistance = 0
  let verticalToTraveledDistance = 0
  const backgroundBoardRect = backgroundBoardRef.value!.getBoundingClientRect()
  let travelMax = backgroundBoardRect.width
  let verticalMax = backgroundBoardRect.height
  const left = backgroundBoardRect.left
  const top = backgroundBoardRect.top

  traveledDistance = Number.parseInt(e.clientX - left)
  verticalToTraveledDistance = Number.parseInt(e.clientY - top)

  if (props.vertical) {
    [verticalToTraveledDistance, traveledDistance]
    = [traveledDistance, verticalToTraveledDistance];

    [travelMax, verticalMax] = [verticalMax, travelMax]
  }
  if (props.dimensionalMovement) {
    if (traveledDistance <= travelMax && traveledDistance >= 0 && verticalToTraveledDistance <= verticalMax && verticalToTraveledDistance >= 0) {
      sliderRef.value!.style.transform = `translate(${traveledDistance}px,${verticalToTraveledDistance}px)`
      emit('update:modelValue', { traveledDistance, verticalToTraveledDistance })
    }
  }
  else {
    if (traveledDistance <= travelMax && traveledDistance >= 0) {
      sliderRef.value!.style.transform = `translate(${traveledDistance}px,0)`
      emit('update:modelValue', { traveledDistance, verticalToTraveledDistance })
    }
  }
}

let isDrag = false
function sliderDown() {
  document.addEventListener('mousemove', dragSlider)
  document.addEventListener('mouseup', sliderUp)
  isDrag = true
}
function sliderUp(e: Event) {
  document.removeEventListener('mousemove', dragSlider)
  document.removeEventListener('mouseup', sliderUp)

  updateSliderPosition(e)
  isDrag = false
}
function dragSlider(e: Event) {
  if (isDrag) {
    requestAnimationFrame(() => {
      updateSliderPosition(e)
    })
  }
}
const attrs = useAttrs()
console.log(attrs)
</script>

<template>
  <div ref="placeholderBoxRef" class="placeholder-box">
    <div ref="backgroundBoardRef" :style="backgroundStyle" class="background-board" @mouseup="sliderUp($event)" @mousedown="sliderDown()">
      <div class="track-bar" />
      <!-- <m-icon>
      <like />
    </m-icon> -->

      <div ref="sliderRef" class="slider" />
    </div>
  </div>
</template>

<style scoped>
.background-board {
    display: flex;
    align-items: center;
    position: relative;
    width: 100px;
    height: 30px;
    background-color: antiquewhite;
}
.track-bar {
    position: relative;
    width: 100%;
    height: 10px;
    background-color: transparent;
}
.slider {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid black;
}
.slider::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #fff;
  transform: scale(0.9);
}
.placeholder-box {
    background-color: transparent;
}
</style>
