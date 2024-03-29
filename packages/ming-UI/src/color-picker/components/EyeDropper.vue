<script setup lang="ts">
import { ColorExtractor, MIcon } from '@ming-UI/icons'

defineOptions({
  name: 'EyeDropper',
})

const props = withDefaults(defineProps<{
  autoClose?: boolean
  delay?: number
  interrupt?: boolean
}>(), {
  autoClose: false,
  delay: 5000,
  interrupt: false,
})
const emit = defineEmits(['update:color'])

function openColorPicker() {
  if (props.interrupt)
    return
  if (!window.EyeDropper) {
    alert('你的浏览器不支持 EyeDropper API')
    return
  }

  const eyeDropper = new EyeDropper()
  const abortController = new AbortController()

  eyeDropper
    .open({ signal: abortController.signal })
    .then((result: any) => {
      console.log(result)
      emit('update:color', result)
    })
    .catch((e: any) => {
      console.log(e)
    })
  if (props.autoClose) {
    setTimeout(() => {
      abortController.abort()
    }, props.delay)
  }
}
defineExpose({
  openColorPicker,
})
</script>

<template>
  <div class="eye-dropper-button" @click="openColorPicker">
    <MIcon fill="#black" stroke-width="10px">
      <ColorExtractor />
    </MIcon>
  </div>
</template>

<style scoped>
.eye-dropper-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: antiquewhite;
  cursor: pointer;
}
</style>
