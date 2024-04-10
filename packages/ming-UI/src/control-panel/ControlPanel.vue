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
    traveledDistanceRatio: 0,
    verticalDistanceRatio: 0,
  }),
  displayTooltip: true,
  placement: 'bottom',
})

const emit = defineEmits(['update:modelValue', 'drag'])

const backgroundBoardRef = ref<HTMLDivElement>()
const sliderRef = ref<HTMLDivElement>()
const trackRef = ref<HTMLDivElement | null>(null)
const progressRef = ref<HTMLDivElement | null>(null)

const travelMax = ref(0)
const verticalMax = ref(0)

const progressFill = ref({})

watch(() => props.modelValue, ({ traveledDistanceRatio, verticalDistanceRatio }) => {
  main(traveledDistanceRatio, verticalDistanceRatio)
}, { deep: true })

const slots = useSlots()
const customizedSlider = ref(false)
onMounted(() => {
  travelMax.value = backgroundBoardRef.value!.getBoundingClientRect().width
  verticalMax.value = backgroundBoardRef.value!.getBoundingClientRect().height
  if ('slider-icon' in slots)
    customizedSlider.value = true

  initSliderAndTrack()
  main(props.modelValue.traveledDistanceRatio, props.modelValue.verticalDistanceRatio)
})

defineExpose({
  travelMax,
  verticalMax,
})

function main(traveledDistanceRatio: number, verticalDistanceRatio: number) {
  passDistanceRatioToTooltip(traveledDistanceRatio, verticalDistanceRatio)
  const { legalTraveledDistance, legalVerticalToTraveledDistance } = ratioConvertToDistance(traveledDistanceRatio, verticalDistanceRatio)
  const { traveledDistance, verticalToTraveledDistance, progressFill } = prepareStyleData(legalTraveledDistance, legalVerticalToTraveledDistance)
  updateSliderAndTrack(traveledDistance, verticalToTraveledDistance, progressFill)
}

function ratioConvertToDistance(traveledDistanceRatio: number, verticalDistanceRatio: number) {
  let _traveledDistanceRatio = traveledDistanceRatio
  let _verticalDistanceRatio = verticalDistanceRatio
  if (typeof traveledDistanceRatio !== 'number')
    _traveledDistanceRatio = 0

  if (typeof verticalDistanceRatio !== 'number')
    _verticalDistanceRatio = 0
  _traveledDistanceRatio = clamp(_traveledDistanceRatio, 100)
  _verticalDistanceRatio = clamp(_verticalDistanceRatio, 100)

  const traveledDistance = Number((_traveledDistanceRatio / 100 * travelMax.value).toFixed(1))
  const verticalToTraveledDistance = Number((_verticalDistanceRatio / 100 * verticalMax.value).toFixed(1))
  return {
    legalTraveledDistance: traveledDistance,
    legalVerticalToTraveledDistance: verticalToTraveledDistance,
  }
}

function distanceConvertToRatio(traveledDistance: number, verticalToTraveledDistance: number) {
  const traveledDistanceRatio = traveledDistance / travelMax.value * 100
  const verticalDistanceRatio = verticalToTraveledDistance / verticalMax.value * 100
  return {
    traveledDistanceRatio,
    verticalDistanceRatio,
  }
}

/**
 * @description Clamp a number within a certain range
 * @param value
 * @param max
 */
function clamp(value: number, max: number): number {
  return Math.min(Math.max(value, 0), max)
}

/**
 * @description Check that the type and range of the coordinate data are valid
 * @param traveledDistance
 * @param verticalToTraveledDistance
 */
function checkDistanceIsLegal(traveledDistance: number, verticalToTraveledDistance: number) {
  let _traveledDistance = traveledDistance
  let _verticalToTraveledDistance = verticalToTraveledDistance
  if (typeof _traveledDistance !== 'number')
    _traveledDistance = 0
  if (typeof _verticalToTraveledDistance !== 'number')
    _verticalToTraveledDistance = 0
  _traveledDistance = clamp(_traveledDistance, travelMax.value)
  _verticalToTraveledDistance = clamp(_verticalToTraveledDistance, verticalMax.value)
  return {
    _traveledDistance,
    _verticalToTraveledDistance,
  }
}

/**
 * @description Initialize the style and state of slider and track based on external parameters
 */
function initSliderAndTrack() {
  const setStyles = (trackWidth: number, trackHeight: number, progressTransformOrigin: string) => {
    if (props.displayTrack && progressRef.value !== null && trackRef.value !== null) {
      trackRef.value.style.width = `${trackWidth}px`
      trackRef.value.style.height = `${trackHeight}px`
      progressRef.value.style.transformOrigin = `${progressTransformOrigin}`
    }
  }
  const backgroundBoardRect = backgroundBoardRef.value!.getBoundingClientRect()
  const sliderRect = sliderRef.value!.getBoundingClientRect()
  let top = 0
  let left = 0

  if (!props.dimensionalMovement) {
    if (props.vertical) {
      top = -sliderRect.height / 2
      left = (backgroundBoardRect.width - sliderRect.width) / 2
      setStyles(props.trackThickness, backgroundBoardRect.height, `bottom center`)
    }
    else {
      top = (backgroundBoardRect.height - sliderRect.height) / 2
      left = -sliderRect.width / 2
      setStyles(backgroundBoardRect.width, props.trackThickness, `left center`)
    }
  }
  else {
    top = -sliderRect.height / 2
    left = -sliderRect.width / 2
    setStyles(backgroundBoardRect.width, props.trackThickness, `left center`)
  }

  sliderRef.value!.style.top = `${top}px`
  sliderRef.value!.style.left = `${left}px`
}

/**
 * @description Computes and returns a valid coordinate value that is within the range
 * @param e
 */
function getMouseCoordinate(e: MouseEvent) {
  if (!backgroundBoardRef.value) {
    return {
      traveledDistance: 0,
      verticalToTraveledDistance: 0,
    }
  }
  const backgroundBoardRect = backgroundBoardRef.value.getBoundingClientRect()
  const left = backgroundBoardRect.left
  const top = backgroundBoardRect.top
  const naturalTraveledDistance = Math.round(e.clientX - left)
  const naturalVerticalToTraveledDistance = Math.round(e.clientY - top)
  const traveledDistance = clamp(naturalTraveledDistance, travelMax.value)
  const verticalToTraveledDistance = clamp(naturalVerticalToTraveledDistance, verticalMax.value)

  return {
    traveledDistance,
    verticalToTraveledDistance,
  }
}

function prepareStyleData(traveledDistance: number, verticalToTraveledDistance: number) {
  let progressRatio = 0
  let progressFill: { transform: string } = { transform: `` }
  let { _traveledDistance, _verticalToTraveledDistance } = checkDistanceIsLegal(traveledDistance, verticalToTraveledDistance)

  if (!props.dimensionalMovement) {
    if (props.vertical) {
      progressRatio = _verticalToTraveledDistance / verticalMax.value
      progressFill = { transform: `scaleY(${progressRatio})` }
      _traveledDistance = 0
      _verticalToTraveledDistance = verticalMax.value - _verticalToTraveledDistance

      return {
        traveledDistance: _traveledDistance,
        verticalToTraveledDistance: _verticalToTraveledDistance,
        progressFill,
      }
    }

    else {
      progressRatio = _traveledDistance / travelMax.value
      progressFill = { transform: `scaleX(${progressRatio})` }
      _verticalToTraveledDistance = 0

      return {
        traveledDistance: _traveledDistance,
        verticalToTraveledDistance: _verticalToTraveledDistance,
        progressFill,
      }
    }
  }
  else {
    progressRatio = _traveledDistance / travelMax.value
    progressFill = { transform: `scaleX(${progressRatio})` }
    return {
      traveledDistance: _traveledDistance,
      verticalToTraveledDistance: _verticalToTraveledDistance,
      progressFill,
    }
  }
}

function updateSliderAndTrack(traveledDistance: number = 0, verticalToTraveledDistance: number = 0, progress: { transform: string }) {
  const { _traveledDistance, _verticalToTraveledDistance } = checkDistanceIsLegal(traveledDistance, verticalToTraveledDistance)
  progressFill.value = progress
  sliderRef.value!.style.transform = `translate(${_traveledDistance}px,${_verticalToTraveledDistance}px) rotate(${props.sliderRotate}deg)`
}

/**
 * @description Provide coordinate data to external components via custom events
 * @param traveledDistance
 * @param verticalToTraveledDistance
 */
function transferRatioData(traveledDistance: number, verticalToTraveledDistance: number) {
  const ratio = distanceConvertToRatio(traveledDistance, verticalToTraveledDistance)
  emit('update:modelValue', { ...ratio })
  emit('drag', { ...ratio })
}

/**
 * @description Call the intermediate function that calculates the coordinate function and the update function
 * @param e
 */
function updateSliderPositionByMouse(e: MouseEvent) {
  let { traveledDistance, verticalToTraveledDistance } = getMouseCoordinate(e)
  if (!props.dimensionalMovement && props.vertical)
    verticalToTraveledDistance = verticalMax.value - verticalToTraveledDistance

  transferRatioData(traveledDistance, verticalToTraveledDistance)
}

const isDrag = ref(false)
function sliderDown() {
  document.addEventListener('mousemove', dragSlider)
  document.addEventListener('mouseup', sliderUp)
  isDrag.value = true
}
function sliderUp(e: MouseEvent) {
  document.removeEventListener('mousemove', dragSlider)
  document.removeEventListener('mouseup', sliderUp)
  if (isDrag.value)
    updateSliderPositionByMouse(e)
  isDrag.value = false
}
function dragSlider(e: MouseEvent) {
  if (isDrag.value) {
    requestAnimationFrame(() => {
      updateSliderPositionByMouse(e)
    })
  }
}

const positionTooltip = ref<string>('')
/**
 * @description Customize the formatting content based on the supplied parameters
 */
function formatter({ traveledDistanceRatio, verticalDistanceRatio }: { traveledDistanceRatio: number;verticalDistanceRatio: number }, formatFunc: (...args: number[]) => string): string {
  let tooltip = ''

  if (props.dimensionalMovement) {
    tooltip = formatFunc(traveledDistanceRatio, verticalDistanceRatio)
  }
  else {
    if (props.vertical)
      tooltip = formatFunc(verticalDistanceRatio)
    else tooltip = formatFunc(traveledDistanceRatio)
  }
  if (typeof tooltip !== 'string') {
    tooltip = ''
    console.warn('The return value should be a string')
  }
  return tooltip
}

/**
 * @description Pass native or custom content to the tooltip
 * @param travel
 * @param vertical
 */
function passDistanceRatioToTooltip(travelRatio: number, verticalRatio: number) {
  if (!props.displayTooltip)
    return

  const traveledDistanceRatio = Math.round(travelRatio)
  const verticalDistanceRatio = Math.round(verticalRatio)

  if (props.formatterTooltip !== undefined) {
    positionTooltip.value = formatter({ traveledDistanceRatio, verticalDistanceRatio }, props.formatterTooltip)
  }
  else {
    if (props.dimensionalMovement) {
      positionTooltip.value = `${traveledDistanceRatio.toString()},${verticalDistanceRatio.toString()}`
    }

    else {
      if (props.vertical)
        positionTooltip.value = verticalDistanceRatio.toString()
      else positionTooltip.value = traveledDistanceRatio.toString()
    }
  }
}
</script>

<template>
  <div ref="backgroundBoardRef" :style="backgroundStyle" class="background-board" @mouseup="sliderUp($event)" @mousedown="sliderDown()">
    <div v-if="displayTrack" ref="trackRef" class="track-bar">
      <div ref="progressRef" class="progress-bar" :style="[progressFill, trackBackgroundColor]" />
    </div>
    <MTooltip :content="positionTooltip" :display="displayTooltip" :placement="placement">
      <div ref="sliderRef" class="slider" :class="{ dragging: isDrag }">
        <slot name="slider-icon">
          <div class="default-slider" :class="{ 'default-slider': !customizedSlider }" />
        </slot>
      </div>
    </MTooltip>
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
    z-index: 10;
}

.track-bar {
    overflow: hidden; /*隐藏scale对border-radius的影响 */
    background-color: #e4e7ed;
    border-radius: v-bind(`${trackThickness / 2}px`);
}
.progress-bar {
  width: 100%;
  height: 100%;
  background-color: v-bind(`${trackBackgroundColor}`);
  border-radius: inherit;
  /* transition: transform 0.3s ease; */
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
