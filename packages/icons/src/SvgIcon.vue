<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  setup(props) {
    console.log(props.color)
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId }
  },
})
</script>

<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" :size="size" />
  </svg>
</template>
