<script  lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useClassnames } from '@ming-UI/utils'

export default defineComponent({
  name: 'MButton',
  props: {
    type: {
      type: String as PropType<'default' | 'primary' | 'dashed'>,
      default: 'default',
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    size: {
      type: String as PropType<'small' | 'default' | 'large'>,
      default: 'default',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handclick = (e: Event) => {
      console.log(111)

      emit('click', e)
    }
    const { c, cx, cm } = useClassnames('button')
    // 根据用户传递的值来动态生成类名
    const cls = cx(() => {
      return {
        [c()]: true,
        [c(cm(props.type))]: true,
        [c('size', cm(props.size))]: true,
      }
    })
    return {
      cls,
      handclick,
    }
  },
  // mounted() {
  //   console.log(this.$props.type)
  // },

})
</script>

<template>
  <div>
    <button :class="cls" :disabled="disabled" @click="handclick">
      <slot>
        button
      </slot>
    </button>
  </div>
</template>
