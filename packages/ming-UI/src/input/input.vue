<script setup lang="ts">
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
</template>
