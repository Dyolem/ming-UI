import type { PropType, VNode } from 'vue'
import { computed, createVNode, defineComponent, ref } from 'vue'

import type { Placement } from '@floating-ui/vue'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'

import { filterEmpty, isBaseType } from '@v-c/utils'
import { useClassnames } from '@ming-UI/utils'

export default defineComponent({
  name: 'MTooltip',
  inheritAttrs: false,
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    content: {
      type: String as PropType<string>,
      default: '',
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover',
    },
    effect: {
      type: String as PropType<'light' | 'dark' | 'customized' | 'fullCustomized'>,
      default: 'dark',
    },
    display: {
      type: Boolean as PropType<true | false>,
      default: true,
    },
  },
  setup(props, { slots, attrs }) {
    const reference = ref(null)
    const floating = ref(null)
    const placement = computed(() => props.placement)
    const show = ref(false)
    const { c, cm } = useClassnames('tooltip')
    const { floatingStyles } = useFloating(reference, floating, {
      placement,
      middleware: [offset(4), flip(), shift({ padding: 5 })],
      whileElementsMounted: autoUpdate,
    })
    let timer: ReturnType<typeof setTimeout> | undefined
    const handleMouseEnter = () => {
      if (props.trigger === 'click')
        return
      show.value = true
    }
    const handleMouseLeave = () => {
      timer = setTimeout(() => {
        show.value = false
      }, 150)
    }
    const handleClick = () => {
      show.value = true
    }
    return () => {
      const renderTooltip = () => {
        if (!reference.value)
          return null
        if (!show.value)
          return null
        const cls = {
          [c()]: true,
          [c(cm(props.effect))]: true,
        }
        const customizedClass = attrs?.class
        const customized = () => {
          if (props.effect === 'fullCustomized')
            return [customizedClass]
          else if (props.effect === 'customized')
            return ['ming-tooltip', customizedClass]
          else return [cls]
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
        if (!props.display)
          return
        return (
          <div {...events} class={customized()} ref={floating} style={floatingStyles.value}>
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
        onclick: handleClick,
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
