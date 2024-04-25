<script setup>
import { computed, ref } from 'vue'
import { nanoid } from 'nanoid'

defineOptions({
  name: 'MRate',
})
const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  maxRating: {
    type: Number,
    default: 5,
  },
  iconComponent: {
    type: Object,
    // default: () => 'svg', // 默认使用svg标签，使用者可以传入任何组件
  },
})
console.log(props.rating, props.maxRating)
const clipId = ref(nanoid())
// const clipWidth = computed(() => `${props.rating / props.maxRating * 100}%`)
const clipWidth = '8'
</script>

<template>
  <div class="rate">
    <svg width="0" height="0">
      <defs>
        <clipPath :id="clipId">
          <rect :width="clipWidth" height="16" />
        </clipPath>
      </defs>
    </svg>
    <svg width="0" height="0">
      <defs>
        <filter :id="`${clipId}-filter`">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
    </svg>
    <div class="svg-container">
      <component :is="iconComponent" class="init-svg fulled-stroke lower-svg" />
      <component :is="iconComponent" class="init-svg fulled-stroke clip-color upper-svg" :style="{ 'clip-path': `url(#${clipId})` }" />
    </div>
    <!-- <div
      v-for="index in Math.ceil(maxRating)"
      :key="index"
      class="star-container"
    >
      <div class="star-clip">
        <component :is="iconComponent" :style="{ 'clip-path': `url(#${clipId})` }" />
      </div>
      <component :is="iconComponent" class="star-background" />
    </div> -->
  </div>
</template>

<style>
.init-svg {

  position: absolute;
  width: 16px;
  height: 16px;
  fill: gray;
}
.star-container {
  display: inline-block;
  position: relative;
}
.svg-container {
  position: relative;
}

.clip-color {
  fill: gold;
}

.fulled-stroke {
  stroke: #333;
}
.lower-svg {
    /* 未选中的图标使用灰度 */
    fill: aquamarine;
    filter: grayscale(50%);

}
</style>
