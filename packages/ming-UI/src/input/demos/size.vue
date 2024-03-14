<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('')
</script>

<template>
  <m-input v-model="msg" size="small" />
  <m-input v-model="msg" />
  <m-input v-model="msg" size="large" />
</template>
