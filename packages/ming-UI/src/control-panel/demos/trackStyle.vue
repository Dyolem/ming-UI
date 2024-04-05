<script setup>
const trackBackgroundColor = 'lightgreen'
const trackHeight = 20
</script>

<template>
  <div class="container">
    <MControlPanel :track-background-color="trackBackgroundColor" :track-height="trackHeight" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 200px;
}
</style>
