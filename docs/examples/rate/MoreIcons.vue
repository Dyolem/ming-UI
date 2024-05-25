<script setup>
import { ref } from 'vue'
import { Like } from '@ming-UI/icons'

const score = ref(2)
</script>

<template>
  <MRate v-model="score" :icon-component="Like" />
</template>
