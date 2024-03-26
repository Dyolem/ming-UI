<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useHexToRgb, useHslToRgb, useRgbToHex, useRgbToHsl } from '@ming-UI/utils'
import ControlPanel from 'ming-UI/control-panel/ControlPanel.vue'
import EyeDropper from './components/EyeDropper.vue'

defineOptions({
  name: 'MColorPicker',
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

const hueBandStyle = ref({
  background: `linear-gradient(to right,
    #ff0000 0%, #ffff00 17%, #00ff00 33%,
    #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`, // 背景颜色
  borderRadius: '5px',
  width: '180px', // 内边距
  height: '30px',
})
const saturationSquareStyle = computed(() => {
  return {
    background: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${colorManager.value.hsl.h}, 100%, 50%))`, // 背景颜色
    color: 'white', // 文本颜色
    width: '260px', // 内边距
    height: '260px',
    borderRadius: '6px',
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
      <div class="hue-box">
        <ControlPanel ref="hueControlRef" v-model:model-value="hConvertToDistance" :vertical="true" :background-style="hueBandStyle" />
        <div class="eye-dropper-box">
          <EyeDropper />
        </div>
        <div class="chosen-color" />
      </div>
    </div>
    <div class="color-value-form">
      <div class="hsl-form">
        <div class="color-input-box">
          <span>H</span>
          <m-input v-model.number="colorManager.hsl.h" size="small" type="number" min="0" max="360" @input="value => updateColor('h', value)" />
        </div>
        <div class="color-input-box">
          <span>S</span>
          <m-input v-model="colorManager.hsl.s" size="small" type="number" min="0" max="100" @input="value => updateColor('s', value)" />
        </div>
        <div class="color-input-box">
          <span>L</span>
          <m-input v-model="colorManager.hsl.l" size="small" type="number" min="0" max="100" @input="value => updateColor('l', value)" />
        </div>
      </div>

      <div class="rgb-form">
        <div class="color-input-box">
          <span>R</span>
          <m-input v-model="colorManager.rgb.r" size="small" type="number" min="0" max="255" @input="value => updateColor('r', value)" />
        </div>
        <div class="color-input-box">
          <span>G</span>
          <m-input v-model="colorManager.rgb.g" size="small" type="number" min="0" max="255" @input="value => updateColor('g', value)" />
        </div>
        <div class="color-input-box">
          <span>B</span>
          <m-input v-model="colorManager.rgb.b" size="small" type="number" min="0" max="255" @input="value => updateColor('b', value)" />
        </div>
      </div>
      <div class="hex-form">
        <div class="color-input-box">
          <span>#</span>
          <m-input v-model="colorManager.hex" size="small" @input="value => updateColor('hex', value)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contanier {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-color: #e6dbf7;
    border-radius: 10px;
}
.color-gradient-wheel {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 0.6;
    height: 90%;

}

.hue-box {
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 100%;
  justify-content: space-around;
}

.color-value-form {
    flex: 0.2;
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 90%;
}
.hsl-form,.rgb-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 0.4;
  width: 100%;
}
.hex-form {
  width: 100%;
}
.color-input-box {
  /* width: 70%; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.color-input-box >span {
  margin-right: 10px;
  color: #333333;
}
.eye-dropper-box {
  margin-top: 10px;
}
.chosen-color {
  width: 30px;
  height: 30px;
  border-radius: 4px;
}
</style>
