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
  // 可以根据需要添加更多样式
})

const H = ref(0)
const S = ref(0)
const L = ref(0)

const R = ref(0)
const G = ref(0)
const B = ref(0)

const hex = ref('000000')

const hueControlRef = ref(null)
const hConvertToDistance = ref({
  traveledDistance: 0,
  verticalToTraveledDistance: 0,
})

watch(H, (newHue) => {
  hConvertToDistance.value.traveledDistance = (newHue / 360) * (hueControlRef.value.travelMax)
  hConvertToDistance.value.verticalToTraveledDistance = 0
  const { r, g, b } = useHslToRgb(H.value, S.value, L.value)
  R.value = r
  G.value = g
  B.value = b
})
watch(hConvertToDistance, (newVal) => {
  H.value = Math.round(360 / (hueControlRef.value.travelMax) * newVal.traveledDistance)
})
const saturationSquareStyle = computed(() => {
  return {
    background: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${H.value}, 100%, 50%))`, // 背景颜色
    color: 'white', // 文本颜色
    width: '200px', // 内边距
    height: '200px',
  // 可以根据需要添加更多样式
  }
})

const colorTakingControlRef = ref(null)
const slConvertToDistance = ref({
  traveledDistance: 0,
  verticalToTraveledDistance: 0,
})
onMounted(() => {
  watch([S, L], ([newSaturation, newLight]) => {
    slConvertToDistance.value.traveledDistance = (colorTakingControlRef.value.travelMax) / 100 * newSaturation
    slConvertToDistance.value.verticalToTraveledDistance = (100 - newLight) * colorTakingControlRef.value.verticalMax / 100
    const { r, g, b } = useHslToRgb(H.value, S.value, L.value)
    R.value = r
    G.value = g
    B.value = b
  }, { immediate: true })
})
watch(slConvertToDistance, (newVal) => {
  S.value = Math.round(100 / hueControlRef.value.travelMax * newVal.traveledDistance)
  L.value = Math.round(100 - (100 / colorTakingControlRef.value.verticalMax * newVal.verticalToTraveledDistance))
})

watch([R, G, B], ([r, g, b]) => {
  const { h, s, l } = useRgbToHsl(r, g, b)
  H.value = h
  S.value = s
  L.value = l
  console.log(r, g, b)
  hex.value = useRgbToHex(r, g, b)
})
watch(hex, (newVal) => {
  const { r = undefined, g = undefined, b = undefined } = useHexToRgb(`#${newVal}`)
  if (r === undefined || g === undefined || b === undefined)
    return
  R.value = r
  G.value = g
  B.value = b
})
const rgbCom = computed(() => {
  console.log(111)
  const rgb = useHslToRgb(H.value, S.value, L.value)
  return rgb
})
</script>

<template>
  <div class="contanier">
    <div class="color-gradient-wheel">
      <ControlPanel ref="colorTakingControlRef" v-model:model-value="slConvertToDistance" :dimensional-movement="true" :background-style="saturationSquareStyle" />
      <ControlPanel ref="hueControlRef" v-model:model-value="hConvertToDistance" :vertical="true" :background-style="hueBandStyle" />
    </div>
    <div class="color-value-form">
      <div class="hsl">
        {{ `h:${H},s:${S},l:${L}` }}
      </div>
      <div class="hsl-form">
        <m-input v-model="H" size="small" />
        <m-input v-model="S" size="small" />
        <m-input v-model="L" size="small" />
      </div>
      <div class="rgb-form">
        <m-input v-model="R" size="small" />
        <m-input v-model="G" size="small" />
        <m-input v-model="B" size="small" />
      </div>
      <div class="hex-form">
        <m-input v-model="hex" size="small" />
      </div>
    </div>
    <div>{{ rgbCom }}</div>
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
