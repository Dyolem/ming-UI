import type { PropType, VNode } from 'vue'
import { computed, createVNode, defineComponent, ref } from 'vue'

import type { Placement } from '@floating-ui/vue'
import { useFloating } from '@floating-ui/vue'
import { filterEmpty, isBaseType } from '@v-c/utils'

export default defineComponent({
  name: 'MTooltip',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'buttom-center',
    },
    content: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots }) {
    const reference = ref(null)
    const floating = ref(null)
    const placement = computed(() => props.placement)
    const { floatingStyles } = useFloating(reference, floating, {
      placement,
    })
    return () => {
      const renderTooltip = () => {
        if (!reference.value)
          return null
        return (
          <div ref={floating} style={floatingStyles.value}>
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
      const tipNode = createVNode(node as VNode, {
        ref: reference,
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
