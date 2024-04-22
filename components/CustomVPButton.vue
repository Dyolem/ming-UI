<script setup>
import { useData, useRouter } from 'vitepress'
import DarkModeButton from './DarkModeButton.vue'
import LightModeButton from './LightModeButton.vue'

const { isDark } = useData()
const router = useRouter()
console.log(router)
function routerJump() {
  router.go('components/button/')
}
</script>

<template>
  <div @click="routerJump">
    <DarkModeButton v-if="isDark" />
    <LightModeButton v-else />
  </div>
</template>
