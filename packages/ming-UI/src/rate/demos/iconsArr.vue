<script setup>
import { ref } from 'vue'

import { DislikeTwo, Like, Star } from '@ming-UI/icons'

const icons = [DislikeTwo, Like, Star]
const score = ref(2)
</script>

<template>
  <MRate v-model="score" :fill-color="['#99A9BF', '#F7BA2A', '#ff9900']" :low-threshold="2" :high-threshold="3" :allow-half="true" :icon-component="icons" />
</template>
