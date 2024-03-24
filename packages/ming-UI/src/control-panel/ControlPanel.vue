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
    verticalToTraveledDistance: 0,
    traveledDistance: 0,
  }),
})

const emit = defineEmits(['update:modelValue'])
const backgroundBoardRef = ref<HTMLDivElement>()
const sliderRef = ref<HTMLDivElement>()
const placeholderBoxRef = ref<HTMLDivElement>()
const mouseInnerPosition = ref({
  verticalToTraveledDistance: '',
  traveledDistance: '',
})
const travelMax = ref(0)
const verticalMax = ref(0)
watch(() => props.modelValue, (newVal, oldVal) => {
  console.log(`new:${newVal.traveledDistance}`, `old:${oldVal.traveledDistance}`)
  if (props.dimensionalMovement)
    sliderRef.value.style.transform = `translate(${mouseInnerPosition.value.traveledDistance}px,${mouseInnerPosition.value.verticalToTraveledDistance}px)`
  else
    sliderRef.value.style.transform = `translate(${newVal.traveledDistance}px,0)`
}, { deep: true })
onMounted(() => {
  travelMax.value = backgroundBoardRef.value!.getBoundingClientRect().width
  verticalMax.value = backgroundBoardRef.value!.getBoundingClientRect().height
  console.log(travelMax.value, verticalMax.value)
  initSliderPosition()
})
defineExpose({
  travelMax,
  verticalMax,
})
function initSliderPosition() {
  const backgroundBoardRect = backgroundBoardRef.value?.getBoundingClientRect()
  const sliderRect = sliderRef.value?.getBoundingClientRect()
  let top = (backgroundBoardRect.height - sliderRect.height) / 2
  const left = -sliderRect.width / 2
  if (props.dimensionalMovement)
    top = -sliderRect.height / 2
  backgroundBoardRef.value.style.transformOrigin = `${backgroundBoardRect.height / 2}px ${backgroundBoardRect.height / 2}px`
  sliderRef.value.style.top = `${top}px`
  sliderRef.value.style.left = `${left}px`
  if (props.vertical) {
    backgroundBoardRef.value.style.transform = `rotate(90deg)`
    placeholderBoxRef.value.style.height = `${backgroundBoardRect.width}px`
    placeholderBoxRef.value.style.width = `${backgroundBoardRect.height}px`
  }
}

function updateSliderPosition(e) {
  const backgroundBoardRect = backgroundBoardRef.value.getBoundingClientRect()
  let travelMax = backgroundBoardRect.width
  let verticalMax = backgroundBoardRect.height
  const left = backgroundBoardRect.left
  const top = backgroundBoardRect.top

  mouseInnerPosition.value.traveledDistance = Number.parseInt(e.clientX - left)
  mouseInnerPosition.value.verticalToTraveledDistance = Number.parseInt(e.clientY - top)

  if (props.vertical) {
    [mouseInnerPosition.value.verticalToTraveledDistance, mouseInnerPosition.value.traveledDistance]
    = [mouseInnerPosition.value.traveledDistance, mouseInnerPosition.value.verticalToTraveledDistance];

    [travelMax, verticalMax] = [verticalMax, travelMax]
  }
  if (props.dimensionalMovement) {
    if (mouseInnerPosition.value.traveledDistance <= travelMax && mouseInnerPosition.value.traveledDistance >= 0 && mouseInnerPosition.value.verticalToTraveledDistance <= verticalMax && mouseInnerPosition.value.verticalToTraveledDistance >= 0) {
      sliderRef.value.style.transform = `translate(${mouseInnerPosition.value.traveledDistance}px,${mouseInnerPosition.value.verticalToTraveledDistance}px)`
      // const distanceMax = { travelMax, verticalMax }
      emit('update:modelValue', { traveledDistance: mouseInnerPosition.value.traveledDistance, verticalToTraveledDistance: mouseInnerPosition.value.verticalToTraveledDistance })
    }
  }
  else {
    if (mouseInnerPosition.value.traveledDistance <= travelMax && mouseInnerPosition.value.traveledDistance >= 0) {
      sliderRef.value.style.transform = `translate(${mouseInnerPosition.value.traveledDistance}px,0)`
      // const distanceMax = { travelMax, verticalMax }
      // emit('update:modelValue', { mouseInnerPosition, distanceMax })
      emit('update:modelValue', { traveledDistance: mouseInnerPosition.value.traveledDistance, verticalToTraveledDistance: mouseInnerPosition.value.verticalToTraveledDistance })
    }
  }
}

let isDrag = false
function sliderDown() {
  console.log(sliderRef.value)
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
