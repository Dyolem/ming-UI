<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'MColorPicker',
})

const saturationSquareRef = ref(null)
const huePickerRef = ref(null)
const hueSliderRef = ref(null)

function computeHueDegree(height) {
  const hue = 360 / hueSliderRef.value.offsetHeight * height
  const colorPickerBackground = `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${hue}, 100%, 50%))`
  saturationSquareRef.value.style.background = colorPickerBackground
  // hueDegree.value=360/hueSliderRef.value.offsetHeight*height
}

function updateHuePickerPosition(e) {
  const huePickerRefHalfHeight = huePickerRef.value.offsetHeight / 2
  const hueSliderRect = huePickerRef.value.parentElement.getBoundingClientRect()
  let position = e.clientY - hueSliderRect.top - huePickerRefHalfHeight
  // 确保滑块位置在色带范围内
  position = Math.max(0, position)
  position = Math.min(hueSliderRect.height, position)
  huePickerRef.value.style.transform = `translate(${(hueSliderRef.value.offsetWidth) / 2 - huePickerRefHalfHeight}px,${position - huePickerRefHalfHeight}px)`
}

const isDrag = ref(false)
function huePickerDown() {
  document.addEventListener('mousemove', dragHuePicker)
  document.addEventListener('mouseup', huePickerUp)
  isDrag.value = true
}
function huePickerUp(e) {
  document.removeEventListener('mousemove', dragHuePicker)
  document.removeEventListener('mouseup', huePickerUp)
  updateHuePickerPosition(e)
  computeHueDegree(e.offsetY)
  isDrag.value = false
}
function dragHuePicker(e) {
  if (isDrag.value) {
    requestAnimationFrame(() => {
      updateHuePickerPosition(e)
      computeHueDegree(e.offsetY)
    })
  }
}
</script>

<template>
  <div class="contanier">
    <div class="color-gradient-wheel">
      <div ref="saturationSquareRef" class="saturation-Value-square" />
      <div ref="hueSliderRef" class="hue-slider" @mouseup="huePickerUp($event)" @mousedown="huePickerDown($event)" @mousemove="dragHuePicker($event)">
        <div ref="huePickerRef" class="hue-picker" />
      </div>
    </div>
    <div class="color-value-form" />
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
    background: linear-gradient(0deg, #000, transparent),
              linear-gradient(90deg, #fff, hsl(200, 100%, 50%));
}
.hue-slider {
    width: 10%;
    height: 100%;
    border-radius: 5px;
    background: linear-gradient(to bottom,
    #ff0000 0%, #ffff00 17%, #00ff00 33%,
    #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}
.hue-picker {
  position: relative;
  width: 16px;
  height: 16px;
  transform: translate(100%,-8px);
  /* background-color: #fff; */
  border-radius: 50%;
  border: 1px solid black;
}
.hue-picker::after {
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
