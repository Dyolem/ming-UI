<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useHexToRgb, useHslToRgb, useRgbToHex, useRgbToHsl } from '@ming-UI/utils'
import ControlPanel from 'ming-UI/control-panel/ControlPanel.vue'
import EyeDropper from './components/EyeDropper.vue'

defineOptions({
  name: 'MColorPicker',
})

const hueBandStyle = ref({
  background: `linear-gradient(to right,
    #ff0000 0%, #ffff00 17%, #00ff00 33%,
    #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`, // 背景颜色
  borderRadius: '5px',
  width: '200px', // 内边距
  height: '30px',
})

const hueControlRef = ref(null)
const hConvertToDistance = ref({
  traveledDistance: 0,
  verticalToTraveledDistance: 0,
})

const colorTakingControlRef = ref(null)
const slConvertToDistance = ref({
  traveledDistance: 0,
  verticalToTraveledDistance: 0,
})

const colorManager = ref({
  hsl: { h: 0, s: 100, l: 50 },
  rgb: { r: 255, g: 0, b: 0 },
  hex: 'ff0000',
})

watch(hConvertToDistance, (newVal) => {
  const newH = Math.round(360 / (hueControlRef.value.travelMax) * newVal.traveledDistance)

  updateColor('h', newH)
})

watch(slConvertToDistance, (newVal) => {
  const newS = Math.round(100 / hueControlRef.value.travelMax * newVal.traveledDistance)
  const newL = Math.round(100 - (100 / colorTakingControlRef.value.verticalMax * newVal.verticalToTraveledDistance))

  updateColor('s', newS)
  updateColor('l', newL)
})

const saturationSquareStyle = computed(() => {
  return {
    background: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${colorManager.value.hsl.h}, 100%, 50%))`, // 背景颜色
    color: 'white', // 文本颜色
    width: '200px', // 内边距
    height: '200px',
  }
})

function checkColorValue(type, value) {
  if (type === 'h')
    return Math.max(Math.min(360, value), 0)

  else if (type === 's' || type === 'l')
    return Math.max(Math.min(100, value), 0)

  else if (['r', 'g', 'b'].includes(type))
    return Math.max(Math.min(255, value), 0)
  else if (type === 'hex')
    return value.replace(/[^a-fA-F0-9]/g, '').substring(0, 6)
}
// 统一更新函数
function updateColor(component, value) {
  value = checkColorValue(component, value)
  if (['h', 's', 'l'].includes(component)) {
    colorManager.value.hsl[component] = value

    const { h, s, l } = colorManager.value.hsl
    const { r, g, b } = useHslToRgb(h, s, l)
    colorManager.value.rgb = { r, g, b }
    colorManager.value.hex = useRgbToHex(r, g, b)
  }
  else if (['r', 'g', 'b'].includes(component)) {
    colorManager.value.rgb[component] = value
    const { r, g, b } = colorManager.value.rgb
    colorManager.value.rgb = { r, g, b }
    const { h, s, l } = useRgbToHsl(r, g, b)
    colorManager.value.hsl = { h, s, l }
    colorManager.value.hex = useRgbToHex(r, g, b)
  }
  else if (component === 'hex') {
    colorManager.value.hex = value
    if (useHexToRgb(`#${value}`) === null)
      return
    const { r, g, b } = useHexToRgb(`#${value}`)
    colorManager.value.rgb = { r, g, b }
    const { h, s, l } = useRgbToHsl(r, g, b)
    colorManager.value.hsl = { h, s, l }
  }
}
</script>

<template>
  <div class="contanier">
    <div class="color-gradient-wheel">
      <ControlPanel ref="colorTakingControlRef" v-model:model-value="slConvertToDistance" :dimensional-movement="true" :background-style="saturationSquareStyle" />
      <ControlPanel ref="hueControlRef" v-model:model-value="hConvertToDistance" :vertical="true" :background-style="hueBandStyle" />
    </div>
    <div class="color-value-form">
      <div class="hsl-form">
        <m-input v-model.number="colorManager.hsl.h" size="small" type="number" min="0" max="360" @input="value => updateColor('h', value)" />
        <m-input v-model="colorManager.hsl.s" size="small" type="number" min="0" max="100" @input="value => updateColor('s', value)" />
        <m-input v-model="colorManager.hsl.l" size="small" type="number" min="0" max="100" @input="value => updateColor('l', value)" />
      </div>

      <div class="rgb-form">
        <m-input v-model="colorManager.rgb.r" size="small" type="number" min="0" max="255" @input="value => updateColor('r', value)" />
        <m-input v-model="colorManager.rgb.g" size="small" type="number" min="0" max="255" @input="value => updateColor('g', value)" />
        <m-input v-model="colorManager.rgb.b" size="small" type="number" min="0" max="255" @input="value => updateColor('b', value)" />
      </div>
      <div class="hex-form">
        <m-input v-model="colorManager.hex" size="small" @input="value => updateColor('hex', value)" />
      </div>
    </div>

    <div class="eye-dropper-box">
      <EyeDropper />
    </div>
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
