<!-- <script setup lang="ts">
import { defineOptions, nextTick, onMounted, ref } from 'vue'
import type { InputProps } from './interface'

defineOptions({
  name: 'MInput',
})
const props = defineProps<InputProps>()
const emit = defineEmits<{
  'update:modelValue': [string]
}>()

const inputRef = ref<HTMLInputElement>()
function setInputValue() {
  const _input = inputRef.value
  if (!_input || _input.value === props.modelValue)
    return

  _input.value = props.modelValue ?? ''
}
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  if (props.modelValue === target.value)
    return
  emit('update:modelValue', target.value)
  nextTick(() => {
    setInputValue()
  })
}
onMounted(() => {
  setInputValue()
})
</script>

<template>
  <div>
    <input ref="inputRef" :value="modelValue" type="text" @input="handleInput">
  </div>
</template> -->

<script setup lang="ts">
import { defineOptions, ref } from 'vue'
import { useClassnames } from '@ming-UI/utils'
import { omit, pick } from 'lodash-es'
import type { InputProps } from './interface'

import { originInputProps } from './interface'

defineOptions({
  name: 'MInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [string]
  'input': [string]
}>()

defineSlots<{
  prefix(): any
  suffix(): any
}>()

// 受控组件实现逻辑
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  // 检查props.modelValue是否被定义
  if (props.modelValue === undefined) {
    // 如果modelValue未被绑定，则可以在这里阻止更新操作
    // 例如，可以选择不emit更新事件，或者重置输入框的值
    target.value = '' // 这将清空输入框，因为没有modelValue绑定
    // 早期返回，不执行emit
  }
  // 如果modelValue被绑定，则正常处理输入
  emit('update:modelValue', target.value)
  emit('input', target.value)
}

// 组件样式代码
const { cx, c, cm, ce } = useClassnames('input')
const cls = cx(() => {
  return {
    [c()]: true,
    [c(cm('disabled'))]: props.disabled,
    [c(cm(props.size))]: true,
    // 注意，如果不使用withDefaults，不可以将props.size传给cm，因为size是可选的，而cm要求传入的参数必选。可以使用非空断言来解决。
  }
})

const inputCls = cx(() => {
  return {
    [c('input')]: true,
  }
})

const inputRef = ref<HTMLInputElement>()
function focus() {
  inputRef.value?.focus()
}
function blur() {
  inputRef.value?.focus()
}
defineExpose({
  focus,
  blur,
})
</script>

<template>
  <div :class="cls" v-bind="omit($attrs, originInputProps)">
    <span v-if="$slots.prefix" :class="c(ce('prefix'))">
      <slot name="prefix" />
    </span>
    <input ref="inputRef" :class="inputCls" :value="modelValue" :type="type" :disabled="disabled" v-bind="pick($attrs, originInputProps)" @input="handleInput">
    <span v-if="$slots.suffix" :class="c(ce('suffix'))">
      <slot name="suffix" />
    </span>
  </div>
</template>
