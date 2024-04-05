<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from 'vue'
import type { ControlPanelProps } from './interface'

defineOptions({
  name: 'MControlPanel',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<ControlPanelProps>(), {
  vertical: false,
  distanceRatio: 0,
  dimensionalMovement: false,
  displayTrack: true,
  trackBackground: () => ({
    backgroundColor: 'var(--ming-color-primary)',
  }),
  hiddenBackgroundBoard: true,
  sliderRotate: 0,
  trackHeight: 10,
  backgroundStyle: () => ({
    width: '200px',
    height: '30px',
  }),
  modelValue: () => ({
    traveledDistance: 0,
    verticalToTraveledDistance: 0,
  }),

})

const emit = defineEmits(['update:modelValue', 'drag'])
const rotateOffset = computed<number>(() => {
  if (props.vertical)
    return 90
  else
    return 0
})

const backgroundBoardRef = ref<HTMLDivElement>()
const sliderRef = ref<HTMLDivElement>()
const placeholderBoxRef = ref<HTMLDivElement>()

const travelMax = ref(0)
const verticalMax = ref(0)
const progressFill = ref({})
const distanceRatio = computed(() => {
  return props.modelValue.traveledDistance / travelMax.value
})
watch(() => props.modelValue, async (newVal) => {
  // 确保传入的移动距离在合法范围内
  const traveledDistance = Math.min(Math.max(newVal.traveledDistance, 0), travelMax.value)
  const verticalToTraveledDistance = Math.min(Math.max(newVal.verticalToTraveledDistance, 0), verticalMax.value)
  // distanceRatio.value = props.modelValue.traveledDistance / travelMax.value

  if (props.displayTrack)
    progressFill.value = { transform: `scaleX(${distanceRatio.value})` }

  if (props.dimensionalMovement)
    sliderRef.value!.style.transform = `translate(${traveledDistance}px,${verticalToTraveledDistance}px) rotate(${props.sliderRotate + rotateOffset.value}deg)`

  else sliderRef.value!.style.transform = `translate(${traveledDistance}px,0) rotate(${props.sliderRotate + rotateOffset.value}deg)`
}, { deep: true })

const slots = useSlots()
const customizedSlider = ref(false)
onMounted(() => {
  travelMax.value = backgroundBoardRef.value!.getBoundingClientRect().width
  verticalMax.value = backgroundBoardRef.value!.getBoundingClientRect().height
  if ('slider-icon' in slots)
    customizedSlider.value = true
  if (props.displayTrack)
    progressFill.value = { transform: `scaleX(0)` }
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
  if (props.displayTrack)
    progressFill.value = { transform: `scaleX(${distanceRatio.value})` }
  if (props.vertical) {
    backgroundBoardRef.value!.style.transform = `translateY(${backgroundBoardRect.width - backgroundBoardRect.height}px) rotate(-90deg)`
    placeholderBoxRef.value!.style.height = `${backgroundBoardRect.width}px`
    placeholderBoxRef.value!.style.width = `${backgroundBoardRect.height}px`
  }
  else {
    placeholderBoxRef.value!.style.height = `${backgroundBoardRect.height}px`
    placeholderBoxRef.value!.style.width = `${backgroundBoardRect.width}px`
  }
  sliderRef.value!.style.transform = `translate(${props.modelValue.traveledDistance}px,${props.modelValue.verticalToTraveledDistance}px) rotate(${props.sliderRotate + rotateOffset.value}deg)`
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
    traveledDistance = travelMax - traveledDistance
  }
  if (props.dimensionalMovement) {
    if (traveledDistance <= travelMax && traveledDistance >= 0 && verticalToTraveledDistance <= verticalMax && verticalToTraveledDistance >= 0) {
      sliderRef.value!.style.transform = `translate(${traveledDistance}px,${verticalToTraveledDistance}px) rotate(${props.sliderRotate + rotateOffset.value}deg)`
      emit('update:modelValue', { traveledDistance, verticalToTraveledDistance })
      emit('drag', { traveledDistance, verticalToTraveledDistance })
    }
  }
  else {
    if (traveledDistance <= travelMax && traveledDistance >= 0) {
      sliderRef.value!.style.transform = `translate(${traveledDistance}px,0) rotate(${props.sliderRotate + rotateOffset.value}deg)`
      if (props.displayTrack)
        progressFill.value = { transform: `scaleX(${traveledDistance / travelMax})` }
      emit('update:modelValue', { traveledDistance, verticalToTraveledDistance })
      emit('drag', { traveledDistance, verticalToTraveledDistance })
    }
  }
}

const isDrag = ref(false)
function sliderDown() {
  document.addEventListener('mousemove', dragSlider)
  document.addEventListener('mouseup', sliderUp)
  isDrag.value = true
}
function sliderUp(e: Event) {
  document.removeEventListener('mousemove', dragSlider)
  document.removeEventListener('mouseup', sliderUp)
  if (isDrag.value)
    updateSliderPosition(e)
  isDrag.value = false
}
function dragSlider(e: Event) {
  if (isDrag.value) {
    requestAnimationFrame(() => {
      updateSliderPosition(e)
    })
  }
}
</script>

<template>
  <div ref="placeholderBoxRef" class="placeholder-box">
    <div ref="backgroundBoardRef" :style="backgroundStyle" :class="hiddenBackgroundBoard ? 'background-board-transparent' : ''" class="background-board" @mouseup="sliderUp($event)" @mousedown="sliderDown()">
      <div v-if="displayTrack" class="track-bar">
        <div class="progress-bar" :style="[progressFill, trackBackground]" />
      </div>

      <div ref="sliderRef" class="slider" :class="{ 'dragging': isDrag, 'slider-default': !customizedSlider }">
        <slot name="slider-icon">
          <div class="inner-circle" />
        </slot>
      </div>
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
.background-board-transparent {
  background-color: transparent;
}
.track-bar {
    overflow: hidden; /*避免scaleX对border-radius的影响 */
    width: 100%;
    height: v-bind(`${trackHeight}px`);
    background-color: #e4e7ed;
    border-radius: v-bind(`${trackHeight / 2}px`);
}
.progress-bar {
  width: 100%;
  height: 100%;
  background-color: #4caf50;
  transform-origin: left center;
  border-radius: inherit;
  /* transition: transform 0.1s ease; 使用transform属性平滑过渡 */
}
.slider {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab
}
.slider-default {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid black;
}
.inner-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #fff;
  transform: scale(0.9);
}
/* .slider-rotate {
  transform: rotate(v-bind(`${sliderRotate}deg`));
} */
.dragging {
  cursor: grabbing;
}
.placeholder-box {
    background-color: transparent;
}
</style>
