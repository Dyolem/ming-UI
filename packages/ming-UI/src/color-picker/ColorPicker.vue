<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useHslToRgb, userRgbToHex } from '@ming-UI/utils'
import ControlPanel from 'ming-UI/control-panel/ControlPanel.vue'

defineOptions({
  name: 'MColorPicker',
})
const initPosition = {
  x: '',
  y: '',
}

const saturationSquareRef = ref(null)
const hueBandRef = ref(null)
const hueSliderRef = ref(null)
const hueSliderRefHalfHeight = ref('')

onMounted(() => {
  computeHueDegree(0)
  hueSliderRefHalfHeight.value = hueSliderRef.value.offsetHeight / 2
  initHueSliderPosition()
})

function initHueSliderPosition() {
  const hueBandRect = hueBandRef.value.getBoundingClientRect()
  const hueSliderRect = hueSliderRef.value.getBoundingClientRect()
  initPosition.x = hueBandRect.width / 2 - hueSliderRect.width / 2
  initPosition.y = hueSliderRect.height / 2
  hueSliderRef.value.style.top = `${-initPosition.y}px`
  hueSliderRef.value.style.left = `${initPosition.x}px`
}
function computeHueDegree(height) {
  const hue = 360 / hueBandRef.value.offsetHeight * height
  const colorPickerBackground = `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${hue}, 100%, 50%))`
  saturationSquareRef.value.style.background = colorPickerBackground
}

function updateHueSliderPosition(e) {
  const hueBandRect = hueBandRef.value.getBoundingClientRect()
  const mouseInnerPositionY = Number.parseInt(e.clientY - hueBandRect.top)

  if (mouseInnerPositionY <= hueBandRef.value.getBoundingClientRect().height && mouseInnerPositionY >= 0) {
    hueSliderRef.value.style.transform = `translate(0,${mouseInnerPositionY}px)`
    computeHueDegree(mouseInnerPositionY)
  }
}

let isDrag = false
function hueSliderDown() {
  document.addEventListener('mousemove', dragHueSlider)
  document.addEventListener('mouseup', hueSliderUp)
  isDrag = true
}
function hueSliderUp(e) {
  document.removeEventListener('mousemove', dragHueSlider)
  document.removeEventListener('mouseup', hueSliderUp)

  updateHueSliderPosition(e)
  isDrag = false
}
function dragHueSlider(e) {
  if (isDrag) {
    requestAnimationFrame(() => {
      updateHueSliderPosition(e)
    })
  }
}

const H = ref(0)
const S = ref(0)
const L = ref(0)
function computedSome(position) {
  // console.log(position)
  H.value = Math.round(360 / position.distanceMax.travelMax * position.mouseInnerPosition.value.traveledDistance)
  const colorPickerBackground = `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${H.value}, 100%, 50%))`
  saturationSquareRef.value.style.background = colorPickerBackground
}
const styleObject = ref({
  background: `linear-gradient(to right,
    #ff0000 0%, #ffff00 17%, #00ff00 33%,
    #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`, // 背景颜色
  color: 'white', // 文本颜色
  width: '100px', // 内边距
  height: '100px',
  // 可以根据需要添加更多样式
})

function computedColorParameter(parameter) {
  S.value = 100 / parameter.distanceMax.travelMax * parameter.mouseInnerPosition.value.traveledDistance
  const baseL = 100
  const decrementTravel = 50 / parameter.distanceMax.travelMax * parameter.mouseInnerPosition.value.traveledDistance
  const dynamicBase = baseL - decrementTravel
  const decrementVerticalToTravel = dynamicBase / parameter.distanceMax.verticalMax * parameter.mouseInnerPosition.value.verticalToTraveledDistance
  L.value = Math.round(dynamicBase - decrementVerticalToTravel)
  const { r, g, b } = useHslToRgb(H.value, S.value, L.value)
  console.log(r, g, b)
  const test = userRgbToHex(r, g, b)

  console.log(test)
}

const style = computed(() => {
  return {
    background: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${H.value}, 100%, 50%))`, // 背景颜色
    color: 'white', // 文本颜色
    width: '100px', // 内边距
    height: '100px',
  // 可以根据需要添加更多样式
  }
})
</script>

<template>
  <div class="contanier">
    <div class="color-gradient-wheel">
      <div ref="saturationSquareRef" class="saturation-Value-square" />
      <div ref="hueBandRef" class="hue-band" @mouseup="hueSliderUp($event)" @mousedown="hueSliderDown($event)">
        <div ref="hueSliderRef" class="hue-slider" />
      </div>
    </div>
    <div class="color-value-form">
      <ControlPanel :vertical="false" :style-object="styleObject" @update:model-value="computedSome" />
    </div>
  </div>
  <ControlPanel :dimensional-movement="true" :style-object="style" @update:model-value="computedColorParameter" />
  <div class="hsl">
    {{ `h:${H},s:${S},l:${L}` }}
  </div>
</template>

<style scoped>
.contanier {
    display: flex;
    align-items: center;
    width: 100%;
    height: 300px;
    background-color: aquamarine;
}
.color-gradient-wheel {
    display: flex;
    justify-content: space-around;
    flex: 0.7;
    height: 90%;

}
.saturation-Value-square {
    width: 70%;
    height: 100%;
    /* background: linear-gradient(0deg, #000, transparent),
              linear-gradient(90deg, #fff, hsl(200, 100%, 50%)); */
}
.hue-band {
    position: relative;
    width: 10%;
    height: 100%;
    border-radius: 5px;
    background: linear-gradient(to bottom,
    #ff0000 0%, #ffff00 17%, #00ff00 33%,
    #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}

.hue-slider {
  position: relative;
  /* top: v-bind(initPosition.y + 'px');
  left: v-bind(initPosition.x + 'px'); */
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid black;
}
.hue-slider::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #fff;
  transform: scale(0.9);
}
.color-value-form {
    flex: 0.3;
}
</style>
