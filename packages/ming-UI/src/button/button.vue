<script  lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useClassnames } from '@ming-UI/utils'

export default defineComponent({
  name: 'TButton',
  props: {
    type: {
      type: String as PropType<'default' | 'primary' | 'dashed'>,
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
    const cls = cx(() => {
      return {
        [c()]: true,
        [c(cm(props.type))]: true,
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
    <button :class="cls" @click="handclick">
      button
    </button>
  </div>
</template>
