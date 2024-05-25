<script setup>
import { useClipBoard } from '@ming-UI/utils'
import { DislikeTwo, Like, MIcon } from '@ming-UI/icons'
import { ref } from 'vue'

function copyIconsName(event) {
  if (event.target?.textContent === undefined)
    return
  const content = `<m-icon><${event.target?.textContent} /></m-icon>`
  useClipBoard(content)
}
const basicIcons = ref(new Map([
  ['Like', Like],
  ['DislikeTwo', DislikeTwo],
]))
</script>

<template>
  <ul :class="$style.grid" class="vp-raw" @click="copyIconsName($event)">
    <li v-for="([name, basic], index) in basicIcons" :key="index">
      <MIcon>
        <component :is="basic" />
      </MIcon>
      <span>{{ name }}</span>
    </li>
  </ul>
</template>

<style module>
  .grid {
          width: 100%;
          display: grid;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          border-left:1px solid #dccfeb;
          border-top:1px solid #dccfeb;
          cursor:pointer;

}
  .grid li {
          border-right:1px solid #dccfeb;
          border-bottom:1px solid #dccfeb;
          aspect-ratio: 1 / 0.8; /* 保持宽高比*/
          display: flex;
          flex-direction:column;
          justify-content: center;
          align-items: center;
          font-size:12px;
        }
  .grid li:hover {
            background-color: #f2f6fc;
            transition: all 0.3s linear;
        }
  .box {
      display: flex;
      justify-content: space-around;
      width: 100%;
    }
</style>
