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
    horizontalDistanceRatio: 0,
    verticalDistanceRatio: 0,
  }),
  ratioAccuracy: 0,
  displayTooltip: true,
  placement: 'bottom',
})

const emit = defineEmits(['update:modelValue', 'drag'])

const backgroundBoardRef = ref<HTMLDivElement>()
const sliderRef = ref<HTMLDivElement>()
const trackRef = ref<HTMLDivElement | null>(null)
const progressRef = ref<HTMLDivElement | null>(null)

const horizontalMax = ref(0)
const verticalMax = ref(0)

const progressFill = ref({})

const slots = useSlots()
const customizedSlider = ref(false)
onMounted(() => {
  horizontalMax.value = backgroundBoardRef.value!.getBoundingClientRect().width
  verticalMax.value = backgroundBoardRef.value!.getBoundingClientRect().height
  if ('slider-icon' in slots)
    customizedSlider.value = true

  initSliderAndTrack()
  watch(() => props.modelValue, ({ horizontalDistanceRatio, verticalDistanceRatio }) => {
    main(horizontalDistanceRatio, verticalDistanceRatio)
  }, { deep: true, immediate: true })
})

defineExpose({
  horizontalMax,
  verticalMax,
})

function main(horizontalDistanceRatio: number, verticalDistanceRatio: number) {
  passDistanceRatioToTooltip(horizontalDistanceRatio, verticalDistanceRatio)
  const { legalHorizontalDistance, legalVerticalDistance } = ratioConvertToDistance(horizontalDistanceRatio, verticalDistanceRatio)
  const { horizontalDistance, verticalDistance, progressFill } = prepareStyleData(legalHorizontalDistance, legalVerticalDistance)
  updateSliderAndTrack(horizontalDistance, verticalDistance, progressFill)
}

function ratioConvertToDistance(horizontalDistanceRatio: number, verticalDistanceRatio: number) {
  const distanceAccuracy = props.ratioAccuracy + 2
  const horizontalDistance = Number((checkParameterTypeAndClamp(horizontalDistanceRatio, 100) / 100 * horizontalMax.value).toFixed(distanceAccuracy))
  const verticalDistance = Number((checkParameterTypeAndClamp(verticalDistanceRatio, 100) / 100 * verticalMax.value).toFixed(distanceAccuracy))
  return {
    legalHorizontalDistance: horizontalDistance,
    legalVerticalDistance: verticalDistance,
  }
}

function distanceConvertToRatio(horizontalDistance: number, verticalDistance: number) {
  const ratioAccuracy = props.ratioAccuracy
  const horizontalDistanceRatio = Number((horizontalDistance / horizontalMax.value * 100).toFixed(ratioAccuracy))
  const verticalDistanceRatio = Number((verticalDistance / verticalMax.value * 100).toFixed(ratioAccuracy))
  return {
    horizontalDistanceRatio,
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

function checkParameterTypeAndClamp(clampMax: number, toBeCheckedParameter: number) {
  let checkedParameter = (typeof toBeCheckedParameter !== 'number') ? 0 : toBeCheckedParameter
  checkedParameter = clamp(checkedParameter, clampMax)

  return checkedParameter
}

/**
 * @description Check that the type and range of the coordinate data are valid
 * @param horizontalDistance
 * @param verticalDistance
 */
function checkDistanceIsLegal(horizontalDistance: number, verticalDistance: number) {
  return {
    _horizontalDistance: checkParameterTypeAndClamp(horizontalDistance, horizontalMax.value),
    _verticalDistance: checkParameterTypeAndClamp(verticalDistance, verticalMax.value),
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
      horizontalDistance: 0,
      verticalDistance: 0,
    }
  }
  const distanceAccuracy = props.ratioAccuracy + 2
  const backgroundBoardRect = backgroundBoardRef.value.getBoundingClientRect()
  const left = backgroundBoardRect.left
  const top = backgroundBoardRect.top

  const naturalHorizontalDistance = Number((e.clientX - left).toFixed(distanceAccuracy))
  const naturalVerticalDistance = Number((e.clientY - top).toFixed(distanceAccuracy))
  const horizontalDistance = clamp(naturalHorizontalDistance, horizontalMax.value)
  const verticalDistance = clamp(naturalVerticalDistance, verticalMax.value)

  return {
    horizontalDistance,
    verticalDistance,
  }
}

function prepareStyleData(horizontalDistance: number, verticalDistance: number) {
  let progressRatio = 0
  let progressFill: { transform: string } = { transform: `` }
  let { _horizontalDistance, _verticalDistance } = checkDistanceIsLegal(horizontalDistance, verticalDistance)

  if (!props.dimensionalMovement) {
    if (props.vertical) {
      progressRatio = _verticalDistance / verticalMax.value
      progressFill = { transform: `scaleY(${progressRatio})` }
      _horizontalDistance = 0
      _verticalDistance = verticalMax.value - _verticalDistance

      return {
        horizontalDistance: _horizontalDistance,
        verticalDistance: _verticalDistance,
        progressFill,
      }
    }

    else {
      progressRatio = _horizontalDistance / horizontalMax.value
      progressFill = { transform: `scaleX(${progressRatio})` }
      _verticalDistance = 0

      return {
        horizontalDistance: _horizontalDistance,
        verticalDistance: _verticalDistance,
        progressFill,
      }
    }
  }
  else {
    progressRatio = _horizontalDistance / horizontalMax.value
    progressFill = { transform: `scaleX(${progressRatio})` }
    return {
      horizontalDistance: _horizontalDistance,
      verticalDistance: _verticalDistance,
      progressFill,
    }
  }
}

function updateSliderAndTrack(horizontalDistance: number = 0, verticalDistance: number = 0, progress: { transform: string }) {
  const { _horizontalDistance, _verticalDistance } = checkDistanceIsLegal(horizontalDistance, verticalDistance)
  progressFill.value = progress
  sliderRef.value!.style.transform = `translate(${_horizontalDistance}px,${_verticalDistance}px) rotate(${props.sliderRotate}deg)`
}

/**
 * @description Provide coordinate data to external components via custom events
 * @param horizontalDistance
 * @param verticalDistance
 */
function transferRatioData(horizontalDistance: number, verticalDistance: number) {
  const ratio = distanceConvertToRatio(horizontalDistance, verticalDistance)
  emit('update:modelValue', { ...ratio })
  emit('drag', { ...ratio })
}

/**
 * @description Call the intermediate function that calculates the coordinate function and the update function
 * @param e
 */
function updateSliderPositionByMouse(e: MouseEvent) {
  let { horizontalDistance, verticalDistance } = getMouseCoordinate(e)
  if (!props.dimensionalMovement && props.vertical)
    verticalDistance = verticalMax.value - verticalDistance

  transferRatioData(horizontalDistance, verticalDistance)
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
function formatter({ horizontalDistanceRatio, verticalDistanceRatio }: { horizontalDistanceRatio: number;verticalDistanceRatio: number }, formatFunc: (...args: number[]) => string): string {
  let tooltip = ''

  if (props.dimensionalMovement) {
    tooltip = formatFunc(horizontalDistanceRatio, verticalDistanceRatio)
  }
  else {
    if (props.vertical)
      tooltip = formatFunc(verticalDistanceRatio)
    else tooltip = formatFunc(horizontalDistanceRatio)
  }
  if (typeof tooltip !== 'string') {
    tooltip = ''
    console.warn('The return value should be a string')
  }
  return tooltip
}

/**
 * @description Pass native or custom content to the tooltip
 * @param horizontalRatio
 * @param verticalRatio
 */
function passDistanceRatioToTooltip(horizontalRatio: number, verticalRatio: number) {
  if (!props.displayTooltip)
    return
  const ratioAccuracy = props.ratioAccuracy
  const horizontalDistanceRatio = Number((horizontalRatio).toFixed(ratioAccuracy))
  const verticalDistanceRatio = Number((verticalRatio).toFixed(ratioAccuracy))

  if (props.formatterTooltip !== undefined) {
    positionTooltip.value = formatter({ horizontalDistanceRatio, verticalDistanceRatio }, props.formatterTooltip)
  }
  else {
    if (props.dimensionalMovement) {
      positionTooltip.value = `${horizontalDistanceRatio.toString()},${verticalDistanceRatio.toString()}`
    }

    else {
      if (props.vertical)
        positionTooltip.value = verticalDistanceRatio.toString()
      else positionTooltip.value = horizontalDistanceRatio.toString()
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
