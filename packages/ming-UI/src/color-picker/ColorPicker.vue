<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useHslToRgb, userRgbToHex } from '@ming-UI/utils'
import ControlPanel from 'ming-UI/control-panel/ControlPanel.vue'

defineOptions({
  name: 'MColorPicker',
})

const H = ref(0)
const S = ref(0)
const L = ref(0)
function computedSome(position) {
  H.value = Math.round(360 / position.distanceMax.travelMax * position.mouseInnerPosition.value.traveledDistance)
}
const hueBandStyle = ref({
  background: `linear-gradient(to right,
    #ff0000 0%, #ffff00 17%, #00ff00 33%,
    #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`, // 背景颜色
  borderRadius: '5px',
  width: '200px', // 内边距
  height: '30px',
  // 可以根据需要添加更多样式
})

function computedColorParameter(parameter) {
  S.value = Math.round(100 / parameter.distanceMax.travelMax * parameter.mouseInnerPosition.value.traveledDistance)
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

// const traveledDistance =ref(0)
// const verticalToTraveledDistance =ref(0)
// function colorConvertDistance(){

// }
const saturationSquareStyle = computed(() => {
  return {
    background: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${H.value}, 100%, 50%))`, // 背景颜色
    color: 'white', // 文本颜色
    width: '200px', // 内边距
    height: '200px',
  // 可以根据需要添加更多样式
  }
})
</script>

<template>
  <div class="contanier">
    <div class="color-gradient-wheel">
      <ControlPanel :dimensional-movement="true" :background-style="saturationSquareStyle" @update:model-value="computedColorParameter" />
      <ControlPanel :vertical="true" :background-style="hueBandStyle" @update:model-value="computedSome" />
    </div>
    <div class="color-value-form">
      <div class="hsl">
        {{ `h:${H},s:${S},l:${L}` }}
      </div>
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
