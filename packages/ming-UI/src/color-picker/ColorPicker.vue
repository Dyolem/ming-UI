<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useClipBoard, useHexToRgb, useHslToRgb, useRgbToHex, useRgbToHsl } from '@ming-UI/utils'
import MControlPanel from '../control-panel/index'
import MInput from '../input/index'
import MTooltip from '../tooltip/index'
import EyeDropper from './components/EyeDropper.vue'
import type { ColorPickerProps, colorManagerType, ratioType } from './interface'

defineOptions({
  name: 'MColorPicker',
})
const props = withDefaults(defineProps<ColorPickerProps>(), {
  enableClose: false,
  fullFunction: true,
  effect: 'dark',
})
const emit = defineEmits<{
  'update:color': [{
    hsl: {
      h: number
      s: number
      l: number
    }
    rgb: {
      r: number
      g: number
      b: number
    }
    hex: string
  }]
}>()

const display = ref<boolean>(true)
const isFullFunction = ref<boolean>(props.fullFunction)

const hueControlRef = ref<InstanceType<typeof MControlPanel> | null>(null)
const hConvertToRatio = ref<ratioType>({
  horizontalDistanceRatio: 0,
  verticalDistanceRatio: 0,
})

const colorTakingControlRef = ref<InstanceType<typeof MControlPanel> | null>(null)
const slConvertToRatio = ref<ratioType>({
  horizontalDistanceRatio: 0,
  verticalDistanceRatio: 0,
})

const colorManager = ref<colorManagerType>({
  hsl: { h: 264, s: 65, l: 91 },
  rgb: { r: 229, g: 217, b: 247 },
  hex: 'E5D9F7',
})

onMounted(() => {
  if (display.value)
    updateColor('h', colorManager.value.hsl.h)
})
const hueBandStyle = ref({
  background: `linear-gradient(to top,
    #ff0000 0%, #ffff00 17%, #00ff00 33%,
    #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`, // 背景颜色
  borderRadius: '5px',
  width: '30px', // 内边距
  height: '180px',
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

const chosenColorStyle = ref({})
function updateColorSelectBox() {
  chosenColorStyle.value = {
    backgroundColor: `#${colorManager.value.hex}`,
  }
}

function checkColorValue<T extends number | string>(type: string, value: T): T {
  if (typeof value === 'number') {
    if (type === 'h' || type === 's' || type === 'l') {
      // 使用 as T 断言返回类型满足泛型约束
      return Math.max(Math.min(type === 'h' ? 360 : 100, value), 0) as T
    }
    else if (['r', 'g', 'b'].includes(type)) {
      return Math.max(Math.min(255, value), 0) as T
    }
  }
  else if (typeof value === 'string' && type === 'hex') {
    // 对字符串进行处理并断言返回类型为 T
    return value.replace(/[^a-fA-F0-9]/g, '').substring(0, 6) as T
  }
  // 在不满足任何条件时，返回原始值，处理逻辑和类型T兼容

  return value
}

// 统一更新函数
function updateColor(component: string, value: number | string) {
  value = checkColorValue(component, value)
  if (typeof value === 'number') {
    if (['h', 's', 'l'].includes(component)) {
      // 明确地更新 hsl 对象
      const hslUpdate = { ...colorManager.value.hsl, [component]: value }
      colorManager.value.hsl = hslUpdate

      // 更新其他颜色表示
      const { r, g, b } = useHslToRgb(hslUpdate.h, hslUpdate.s, hslUpdate.l)
      colorManager.value.rgb = { r, g, b }
      colorManager.value.hex = useRgbToHex(r, g, b)
    }
    else if (['r', 'g', 'b'].includes(component)) {
      // 明确地更新 rgb 对象
      const rgbUpdate = { ...colorManager.value.rgb, [component]: value }
      colorManager.value.rgb = rgbUpdate

      // 更新其他颜色表示
      const { h, s, l } = useRgbToHsl(rgbUpdate.r, rgbUpdate.g, rgbUpdate.b)
      colorManager.value.hsl = { h, s, l }
      colorManager.value.hex = useRgbToHex(rgbUpdate.r, rgbUpdate.g, rgbUpdate.b)
    }
  }
  else if (typeof value === 'string') {
    colorManager.value.hex = value
    if (useHexToRgb(`#${value}`) === null)
      return
    const { r, g, b } = useHexToRgb(`#${value}`)!
    colorManager.value.rgb = { r, g, b }
    const { h, s, l } = useRgbToHsl(r, g, b)
    colorManager.value.hsl = { h, s, l }
  }

  if (isFullFunction.value)
    updateSliderPosition()
  updateColorSelectBox()
  emit('update:color', colorManager.value)
}
async function updateSliderPosition() {
  if (isFullFunction.value)
    await nextTick()

  hConvertToRatio.value.horizontalDistanceRatio = 0
  hConvertToRatio.value.verticalDistanceRatio = colorManager.value.hsl.h / 360 * 100

  slConvertToRatio.value.horizontalDistanceRatio = colorManager.value.hsl.s / 100 * 100
  slConvertToRatio.value.verticalDistanceRatio = (100 - colorManager.value.hsl.l) / 100 * 100
}

function positionUpdateColor(colorType: string, val: ratioType) {
  if (hueControlRef.value === null || colorTakingControlRef.value === null)
    return
  if (colorType === 'h') {
    const newH = Math.round(360 * val.verticalDistanceRatio / 100)
    const checkedH = checkColorValue('h', newH)
    colorManager.value.hsl.h = checkedH

    const { h, s, l } = colorManager.value.hsl
    const { r, g, b } = useHslToRgb(h, s, l)
    colorManager.value.rgb = { r, g, b }
    colorManager.value.hex = useRgbToHex(r, g, b)
  }
  else {
    const newS = Math.round(100 * val.horizontalDistanceRatio / 100)
    const newL = Math.round(100 - (100 * val.verticalDistanceRatio / 100))

    const checkedS = checkColorValue('h', newS)
    colorManager.value.hsl.s = checkedS
    const checkedL = checkColorValue('h', newL)
    colorManager.value.hsl.l = checkedL
    const { h, s, l } = colorManager.value.hsl
    const { r, g, b } = useHslToRgb(h, s, l)
    colorManager.value.rgb = { r, g, b }
    colorManager.value.hex = useRgbToHex(r, g, b)
  }
  updateColorSelectBox()
  emit('update:color', colorManager.value)
}

function eyedropperResolve(colorType: string, { sRGBHex }: { sRGBHex: string }) {
  updateColor(colorType, sRGBHex)
}

let timer: any = null
const interruptOpenEyeDropper = ref<boolean>(false)
const pressAnimation = ref<boolean>(false)
function openColorBoard() {
  pressAnimation.value = !pressAnimation.value
  timer = setTimeout(() => {
    interruptOpenEyeDropper.value = true
    isFullFunction.value = !isFullFunction.value
    updateSliderPosition()
  }, 400) // 400毫秒后执行
}

function cancelOpenBehavior() {
  pressAnimation.value = !pressAnimation.value
  interruptOpenEyeDropper.value = false
  clearTimeout(timer)
}

function closeColorBoard() {
  if (props.enableClose)
    display.value = false
}

function copyColorValue(content: string) {
  useClipBoard(content)
}
</script>

<template>
  <div v-if="display" class="container" :class="isFullFunction ? 'full' : 'partial'">
    <div class="color-gradient-wheel">
      <MControlPanel v-if="isFullFunction" ref="colorTakingControlRef" v-model:model-value="slConvertToRatio" :dimensional-movement="true" :background-style="saturationSquareStyle" @drag="value => positionUpdateColor('sl', value)">
        <template #slider-icon>
          <div class="picker" />
        </template>
      </MControlPanel>
      <div class="hue-box">
        <MControlPanel v-if="isFullFunction" ref="hueControlRef" v-model:model-value="hConvertToRatio" :vertical="true" :background-style="hueBandStyle" :display-track="false" @drag="value => positionUpdateColor('h', value)">
          <template #slider-icon>
            <div class="picker" />
          </template>
        </MControlPanel>
        <div class="eye-dropper-box" :class="pressAnimation ? 'loading' : ''" @mousedown="openColorBoard" @mouseup="cancelOpenBehavior">
          <EyeDropper :interrupt="interruptOpenEyeDropper" @update:color="value => eyedropperResolve('hex', value)">
            <slot />
          </EyeDropper>
        </div>
        <MTooltip :content="`#${colorManager.hex}`" :effect="effect">
          <div :style="chosenColorStyle" class="chosen-color" @click="copyColorValue(`#${colorManager.hex}`)" @dblclick="closeColorBoard" />
        </MTooltip>
      </div>
    </div>
    <div v-if="isFullFunction" class="color-value-form">
      <div class="hsl-form">
        <div class="color-input-box">
          <span>H</span>
          <MInput v-model.number="colorManager.hsl.h" :input-style="{ width: '50px', backgroundColor: 'transparent' }" size="small" type="number" min="0" max="360" @input="value => updateColor('h', value)" />
        </div>
        <div class="color-input-box">
          <span>S</span>
          <MInput v-model.number="colorManager.hsl.s" :input-style="{ width: '50px', backgroundColor: 'transparent' }" size="small" type="number" min="0" max="100" @input="value => updateColor('s', value)" />
        </div>
        <div class="color-input-box">
          <span>L</span>
          <MInput v-model.number="colorManager.hsl.l" :input-style="{ width: '50px', backgroundColor: 'transparent' }" size="small" type="number" min="0" max="100" @input="value => updateColor('l', value)" />
        </div>
      </div>

      <div class="rgb-form">
        <div class="color-input-box">
          <span>R</span>
          <MInput v-model.number="colorManager.rgb.r" :input-style="{ width: '50px', backgroundColor: 'transparent' }" size="small" type="number" min="0" max="255" @input="value => updateColor('r', value)" />
        </div>
        <div class="color-input-box">
          <span>G</span>
          <MInput v-model.number="colorManager.rgb.g" :input-style="{ width: '50px', backgroundColor: 'transparent' }" size="small" type="number" min="0" max="255" @input="value => updateColor('g', value)" />
        </div>
        <div class="color-input-box">
          <span>B</span>
          <MInput v-model.number="colorManager.rgb.b" :input-style="{ width: '50px', backgroundColor: 'transparent' }" size="small" type="number" min="0" max="255" @input="value => updateColor('b', value)" />
        </div>
      </div>
      <div class="hex-form">
        <div class="color-input-box">
          <span>#</span>
          <MInput v-model="colorManager.hex" :input-style="{ width: '50px', backgroundColor: 'transparent' }" size="small" @input="value => updateColor('hex', value)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #AB8FD6;
    border-radius: 10px;
    transition: all .4s ease-in-out;
}
.full {
  width: 500px;
  height: 300px;
}
.partial {
      width: 50px;
    height: 100px;
}
.color-gradient-wheel {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 0.7;
    height: 90%;

}

.hue-box {
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 100%;
  justify-content: space-around;
  align-items: center;
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
  transition: all 500ms ease-in-out;
}
.loading {
  transform: rotate(360deg);
}

.chosen-color {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: antiquewhite;
  border: 1px solid #E5D9F7;
}
.picker {
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid black;
}
.picker::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #fff;
  transform: scale(0.9);
}
</style>
