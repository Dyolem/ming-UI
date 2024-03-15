import type { PropType, VNode } from 'vue'
import { computed, createVNode, defineComponent, ref } from 'vue'

import type { Placement } from '@floating-ui/vue'
import { offset, useFloating } from '@floating-ui/vue'

import { filterEmpty, isBaseType } from '@v-c/utils'
import { useClassnames } from '@ming-UI/utils'

export default defineComponent({
  name: 'MTooltip',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom-center',
    },
    content: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots }) {
    const reference = ref(null)
    const floating = ref(null)
    const placement = computed(() => props.placement)
    const show = ref(false)
    const { c } = useClassnames('tooltip')
    const { floatingStyles } = useFloating(reference, floating, {
      placement,
      middleware: [offset(4)],
    })
    let timer: ReturnType<typeof setTimeout> | undefined
    const handleMouseEnter = () => {
      show.value = true
    }
    const handleMouseLeave = () => {
      timer = setTimeout(() => {
        show.value = false
      }, 150)
    }

    return () => {
      const renderTooltip = () => {
        if (!reference.value)
          return null
        if (!show.value)
          return null
        const cls = {
          [c()]: true,
        }
        const events = {
          onMouseenter: () => {
            if (timer)
              clearTimeout(timer)
            timer = undefined
          },
          onMouseleave: () => {
            show.value = false
          },
        }
        return (
          <div {...events} class={cls} ref={floating} style={floatingStyles.value}>
            {slots.content ? slots.content?.() : props.content}
          </div>
        )
      }
      const children = filterEmpty(slots.default?.())
      if (children && children.length < 1)
        return null
      if (children.length > 1) {
        console.warn('MTooltip can only have one child')
        return children
      }
      const node = children[0]
      if (isBaseType(node)) {
        console.warn('MTooltip must have a child component')
        return node
      }

      const events = {
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave,
      }
      const tipNode = createVNode(node as VNode, {
        ref: reference,
        ...events,
      })
      return (
        <>
          {tipNode}
          {renderTooltip()}
        </>

      )
    }
  },
})
