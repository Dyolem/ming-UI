<script setup>
import { ref } from 'vue'

import { Like } from '@ming-UI/icons'

// import { BookMarkOne, Like, Star } from '../../../../icons/src/index.ts'

const score = ref(2)
</script>

<template>
  <MRate v-model="score" :icon-component="Like" />
</template>
