<script setup lang="ts">
import { MIcon, Star } from '@ming-UI/icons'

defineOptions({
  name: 'MNotification',
})
</script>

<template>
  <div class="container">
    <div class="replaceable-box">
      <div class="native-content-box">
        <div class="left-side">
          <MIcon>
            <Star />
          </MIcon>
        </div>
        <div class="main">
          <h1>head</h1>
          <p> close          This is a message that does not automatically close          This is a message that does not automatically close</p>
        </div>
        <div class="right-side">
          <MIcon>
            <Star />
          </MIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1),
    -2px -2px 2px 2px rgba(0, 0, 0, 0.1),
    2px -2px 2px 2px rgba(0, 0, 0, 0.1),
    -2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.replaceable-box {
  --width-gap: 20px;
  --height-gap: 10px;
  margin: var(--height-gap) var(--width-gap);
  background-color: aqua;
}
.native-content-box {
  position: relative;
  min-width: 200px;
  max-width: 300px;

  display: flex;
}
.left-side {
  width: 30px;
  height: 100%;
}
.right-side {
  position: absolute;
  top: 1px;
  right: 1px;
  cursor: pointer;
}
.main {
  flex: 1;
  background-color: beige;
}
.main h1 {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
}
.scroll {
  overflow: auto;
  max-height: 100px;
}
</style>
