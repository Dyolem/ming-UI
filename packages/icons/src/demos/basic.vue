<template>
  <div class="box">
    <m-icon>
      <Like class="icon" />
    </m-icon>
    <m-icon>
      <Pause />
    </m-icon>
    <m-icon>
      <VolumeUp />
    </m-icon>
    <m-icon>
      <Mute />
    </m-icon>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.icon {
  fill: red;
}
</style>
