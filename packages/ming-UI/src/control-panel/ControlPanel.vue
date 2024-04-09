<script setup lang="ts">
import { onMounted, ref, useSlots, watch } from 'vue'
import { MTooltip } from 'ming-UI'
import type { ControlPanelProps } from './interface'

defineOptions({
  name: 'MControlPanel',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<ControlPanelProps>(), {
  vertical: false,
  progressRatio: 0,
  dimensionalMovement: false,
  displayTrack: (prop) => {
    if (prop.dimensionalMovement)
      return false
    else return true
  },
  trackBackgroundColor: 'var(--ming-color-primary)',
  sliderRotate: 0,
  trackThickness: 10,
  backgroundStyle: (prop) => {
    if (prop.vertical) {
      return {
        width: '30px',
        height: '200px',
      }
    }
    else {
      return {
        width: '200px',
        height: '30px',
      }
    }
  },
  modelValue: () => ({
    traveledDistance: 0,
    verticalToTraveledDistance: 0,
  }),
  displayTooltip: false,
  placement: 'bottom',
})

const emit = defineEmits(['update:modelValue', 'drag'])
// const rotateOffset = computed<number>(() => {
//   if (props.vertical)
//     return 90
//   else
//     return 0
// })

const backgroundBoardRef = ref<HTMLDivElement>()
const sliderRef = ref<HTMLDivElement>()
const trackRef = ref<HTMLDivElement | null>(null)
const progressRef = ref<HTMLDivElement | null>(null)
const placeholderBoxRef = ref<HTMLDivElement>()

const travelMax = ref(0)
const verticalMax = ref(0)
const progressFill = ref({})
// const progressRatio = ref(0)
watch(() => props.modelValue, (newVal) => {
  updateSliderAndTrack(newVal.traveledDistance, newVal.verticalToTraveledDistance, true)
}, { deep: true })

const slots = useSlots()
const customizedSlider = ref(false)
onMounted(() => {
  travelMax.value = backgroundBoardRef.value!.getBoundingClientRect().width
  verticalMax.value = backgroundBoardRef.value!.getBoundingClientRect().height
  if ('slider-icon' in slots)
    customizedSlider.value = true

  initSliderAndTrack()
})

defineExpose({
  travelMax,
  verticalMax,
})
function clamp(value: number, max: number): number {
  return Math.min(Math.max(value, 0), max)
}

function initSliderAndTrack() {
  const backgroundBoardRect = backgroundBoardRef.value!.getBoundingClientRect()
  const sliderRect = sliderRef.value!.getBoundingClientRect()
  let top = 0
  let left = 0

  let traveledDistance = clamp(props.modelValue.traveledDistance, travelMax.value)
  let verticalToTraveledDistance = clamp(props.modelValue.verticalToTraveledDistance, verticalMax.value)
  if (trackRef.value !== null)
    trackRef.value!.style.width = `${props.trackThickness}px`
  if (!props.dimensionalMovement) {
    if (props.vertical) {
      traveledDistance = 0
      top = -sliderRect.height / 2
      left = (backgroundBoardRect.width - sliderRect.width) / 2
      trackRef.value!.style.width = `${props.trackThickness}px`
      trackRef.value!.style.height = `${backgroundBoardRect.height}px`
      progressRef.value!.style.transformOrigin = `bottom center`
    }
    else {
      verticalToTraveledDistance = 0
      top = (backgroundBoardRect.height - sliderRect.height) / 2
      left = -sliderRect.width / 2
      trackRef.value!.style.width = `${backgroundBoardRect.width}px`
      trackRef.value!.style.height = `${props.trackThickness}px`
      progressRef.value!.style.transformOrigin = `left center`
    }
  }
  else {
    top = -sliderRect.height / 2
    left = -sliderRect.width / 2
  }

  sliderRef.value!.style.top = `${top}px`
  sliderRef.value!.style.left = `${left}px`

  updateSliderAndTrack(traveledDistance, verticalToTraveledDistance, true)
}

function getMouseCoordinate(e: Event) {
  if (!backgroundBoardRef.value) {
    return {
      traveledDistance: 0,
      verticalToTraveledDistance: 0,
    }
  }
  const backgroundBoardRect = backgroundBoardRef.value.getBoundingClientRect()
  const left = backgroundBoardRect.left
  const top = backgroundBoardRect.top
  const naturalTraveledDistance = Number.parseInt(e.clientX - left)
  const naturalVerticalToTraveledDistance = Number.parseInt(e.clientY - top)
  const traveledDistance = clamp(naturalTraveledDistance, travelMax.value)
  const verticalToTraveledDistance = clamp(naturalVerticalToTraveledDistance, verticalMax.value)

  return {
    traveledDistance,
    verticalToTraveledDistance,
  }
}

function updateSliderAndTrack(traveledDistance: number = 0, verticalToTraveledDistance: number = 0, externalSource: boolean) {
  const transformToUser = (transformVerticalDistance: number) => {
    return verticalMax.value - transformVerticalDistance
  }
  const userToTransform = (userVerticalDistance: number) => {
    return verticalMax.value - userVerticalDistance
  }

  let progressRatio = 0

  let _traveledDistance = clamp(traveledDistance, travelMax.value)
  let _verticalToTraveledDistance = clamp(verticalToTraveledDistance, verticalMax.value)

  if (!props.dimensionalMovement) {
    if (props.vertical) {
      _traveledDistance = 0

      if (externalSource) {
        progressRatio = _verticalToTraveledDistance / verticalMax.value
        progressFill.value = { transform: `scaleY(${progressRatio})` }
        const transformVerticalToTraveledDistance = userToTransform(_verticalToTraveledDistance)
        sliderRef.value!.style.transform = `translate(${_traveledDistance}px,${transformVerticalToTraveledDistance}px) rotate(${props.sliderRotate}deg)`
        passPositionToTooltip(_traveledDistance, _verticalToTraveledDistance)

        return {
          traveledDistance: _traveledDistance,
          verticalToTraveledDistance: _verticalToTraveledDistance,
        }
      }
      else {
        const userVerticalDistance = transformToUser(_verticalToTraveledDistance)
        progressRatio = userVerticalDistance / verticalMax.value
        progressFill.value = { transform: `scaleY(${progressRatio})` }

        sliderRef.value!.style.transform = `translate(${_traveledDistance}px,${_verticalToTraveledDistance}px) rotate(${props.sliderRotate}deg) `
        passPositionToTooltip(_traveledDistance, userVerticalDistance)

        return {
          traveledDistance: _traveledDistance,
          verticalToTraveledDistance: userVerticalDistance,
        }
      }
    }

    else {
      _verticalToTraveledDistance = 0
      sliderRef.value!.style.transform = `translate(${_traveledDistance}px,${_verticalToTraveledDistance}px) rotate(${props.sliderRotate}deg)`
      passPositionToTooltip(_traveledDistance, _verticalToTraveledDistance)
      progressRatio = _traveledDistance / travelMax.value
      progressFill.value = { transform: `scaleX(${progressRatio})` }
      return {
        traveledDistance: _traveledDistance,
        verticalToTraveledDistance: _verticalToTraveledDistance,
      }
    }
  }

  sliderRef.value!.style.transform = `translate(${_traveledDistance}px,${_verticalToTraveledDistance}px) rotate(${props.sliderRotate}deg)`
  passPositionToTooltip(_traveledDistance, _verticalToTraveledDistance)
  return {
    traveledDistance: _traveledDistance,
    verticalToTraveledDistance: _verticalToTraveledDistance,
  }
}

function transferPositionData(traveledDistance: number, verticalToTraveledDistance: number) {
  emit('update:modelValue', { traveledDistance, verticalToTraveledDistance })
  emit('drag', { traveledDistance, verticalToTraveledDistance })
}

function updateSliderPositionByMouse(e: Event) {
  const { traveledDistance, verticalToTraveledDistance } = getMouseCoordinate(e)
  const distance = updateSliderAndTrack(traveledDistance, verticalToTraveledDistance, false)
  transferPositionData(distance.traveledDistance, distance.verticalToTraveledDistance)
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
    updateSliderPositionByMouse(e)
  isDrag.value = false
}
function dragSlider(e: Event) {
  if (isDrag.value) {
    requestAnimationFrame(() => {
      updateSliderPositionByMouse(e)
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
    const res = formatFunc(axis, vertical)

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
    if (props.dimensionalMovement) {
      positionTooltip.value = `${axis.toString()},${vertical.toString()}`
    }

    else {
      if (props.vertical)
        positionTooltip.value = vertical.toString()
      else positionTooltip.value = axis.toString()
    }
  }
}
</script>

<template>
  <div ref="placeholderBoxRef" class="placeholder-box">
    <div ref="backgroundBoardRef" :style="backgroundStyle" class="background-board" @mouseup="sliderUp($event)" @mousedown="sliderDown()">
      <div v-if="displayTrack" ref="trackRef" class="track-bar">
        <div ref="progressRef" class="progress-bar" :style="[progressFill, trackBackgroundColor]" />
      </div>
      <MTooltip :content="positionTooltip" :display="displayTooltip" :placement="placement">
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
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100px;
    height: 30px;

}

.track-bar {
    overflow: hidden; /*避免scaleX对border-radius的影响 */
    background-color: #e4e7ed;
    border-radius: v-bind(`${trackThickness / 2}px`);
}
.progress-bar {
  width: 100%;
  height: 100%;
  background-color: v-bind(`${trackBackgroundColor}`);
  /* transform-origin: center bottom; */
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
  width: v-bind(`${1.6 * trackThickness}px`);
  height: v-bind(`${1.6 * trackThickness}px`);
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
