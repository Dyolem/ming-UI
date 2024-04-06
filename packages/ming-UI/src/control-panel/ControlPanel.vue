<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from 'vue'
import { MTooltip } from 'ming-UI'
import type { ControlPanelProps } from './interface'

defineOptions({
  name: 'MControlPanel',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<ControlPanelProps>(), {
  vertical: false,
  distanceRatio: 0,
  dimensionalMovement: false,
  displayTrack: (prop) => {
    if (prop.dimensionalMovement)
      return false
    else return true
  },
  trackBackgroundColor: 'var(--ming-color-primary)',
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
  displayTooltip: false,
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
  passPositionToTooltip(props.modelValue.traveledDistance, props.modelValue.verticalToTraveledDistance)
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
  const traveledDistance = Math.min(Math.max(props.modelValue.traveledDistance, 0), travelMax.value)
  const verticalToTraveledDistance = props.dimensionalMovement ? Math.min(Math.max(props.modelValue.verticalToTraveledDistance, 0), verticalMax.value) : 0

  sliderRef.value!.style.transform = `translate(${traveledDistance}px,${verticalToTraveledDistance}px) rotate(${props.sliderRotate + rotateOffset.value}deg)`
  passPositionToTooltip(traveledDistance, verticalToTraveledDistance)
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
      if (props.displayTrack)
        progressFill.value = { transform: `scaleX(${traveledDistance / travelMax})` }

      emit('update:modelValue', { traveledDistance, verticalToTraveledDistance })
      emit('drag', { traveledDistance, verticalToTraveledDistance })
      passPositionToTooltip(traveledDistance, verticalToTraveledDistance)
    }
  }
  else {
    if (traveledDistance <= travelMax && traveledDistance >= 0) {
      sliderRef.value!.style.transform = `translate(${traveledDistance}px,0) rotate(${props.sliderRotate + rotateOffset.value}deg)`

      if (props.displayTrack)
        progressFill.value = { transform: `scaleX(${traveledDistance / travelMax})` }

      emit('update:modelValue', { traveledDistance, verticalToTraveledDistance: 0 })
      emit('drag', { traveledDistance, verticalToTraveledDistance: 0 })
      passPositionToTooltip(traveledDistance, verticalToTraveledDistance)
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

const positionTooltip = ref<string>('')
function formatter({ axis, vertical }: { axis: number;vertical: number }, formatFunc: (...args: number[]) => { traveledDistance: number;verticalToTraveledDistance: number } | string): string {
  let tooltip = ''
  if (props.dimensionalMovement) {
    const res = formatFunc(axis, vertical)

    // 检查res是否为对象且包含traveledDistance属性
    if (typeof res === 'object' && res !== null && 'traveledDistance' in res) {
      tooltip = `X:${res.traveledDistance},Y:${res.verticalToTraveledDistance}`
    }
    else {
      // 处理错误或不符合预期的返回值
      tooltip = res
      console.warn('The return value should be an object')
    }
  }
  else {
    const res = formatFunc(axis)

    // 一维情况
    if (typeof res === 'string') {
      tooltip = `${res}`
    }
    else {
      // 处理错误或不符合预期的返回值
      tooltip = `${res}`
      console.warn('The return value should be a string')
    }
  }

  return tooltip
}

function passPositionToTooltip(axis: number, vertical: number) {
  if (!props.displayTooltip)
    return
  if (props.formatterTooltip !== undefined) {
    positionTooltip.value = formatter({ axis, vertical }, props.formatterTooltip)
  }
  else {
    if (props.dimensionalMovement)
      positionTooltip.value = `${axis.toString()},${vertical.toString()}`

    else positionTooltip.value = axis.toString()
  }
}
</script>

<template>
  <div ref="placeholderBoxRef" class="placeholder-box">
    <div ref="backgroundBoardRef" :style="backgroundStyle" class="background-board" @mouseup="sliderUp($event)" @mousedown="sliderDown()">
      <div v-if="displayTrack" class="track-bar">
        <div class="progress-bar" :style="[progressFill, trackBackgroundColor]" />
      </div>
      <MTooltip :content="positionTooltip" :display="displayTooltip">
        <div ref="sliderRef" class="slider" :class="{ dragging: isDrag }">
          <slot name="slider-icon">
            <div class="default-slider" :class="{ 'default-slider': !customizedSlider }" />
          <!-- <div class="inner-circle" /> -->
          </slot>
        </div>
      </MTooltip>
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
  background-color: v-bind(`${trackBackgroundColor}`);
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

.default-slider {
  width: v-bind(`${1.6 * trackHeight}px`);
  height: v-bind(`${1.6 * trackHeight}px`);
  border-radius: 50%;
  border: 1px solid var(--ming-color-primary);
  background-color: #fff
}

.dragging {
  cursor: grabbing;
}
.placeholder-box {
    background-color: transparent;
}
</style>
