<script setup>
import { useClipBoard } from '@ming-UI/utils'
import { BookMark, BookMarkOne, ColorExtractor, DislikeTwo, Download, Like, MIcon, Mute, Pause, PlayOne, Star, VoiceOne, VolumeDown, VolumeUp } from '@ming-UI/icons'
import { markRaw, ref } from 'vue'

function copyIconsName(event) {
  if (event.target?.textContent === undefined)
    return
  const content = `<m-icon><${event.target?.textContent} /></m-icon>`
  useClipBoard(content)
}
const basicIcons = ref(new Map([
  ['Like', markRaw(Like)],
  ['DislikeTwo', markRaw(DislikeTwo)],
]))
const mediaIcons = ref(new Map([
  ['PlayOne', markRaw(PlayOne)],
  ['Pause', markRaw(Pause)],
  ['Mute', markRaw(Mute)],
  ['volumeUp', markRaw(VolumeUp)],
  ['VoiceOne', markRaw(VoiceOne)],
  ['voiceDown', markRaw(VolumeDown)],
]))
const officeIcons = ref(new Map([
  ['Download', markRaw(Download)],
  ['BookMark', markRaw(BookMark)],
  ['BookMarkOne', markRaw(BookMarkOne)],
]))
const editIcons = ref(new Map([
  ['ColorExtractor', markRaw(ColorExtractor)],
  ['Star', markRaw(Star)],

]))
</script>

<template>
  <div :class="$style.container" @click="copyIconsName($event)">
    <div :class="$style.collectionItem">
      <h3>基础</h3>
      <ul :class="$style.grid" class="vp-raw">
        <li v-for="([name, comp], index) in basicIcons" :key="index">
          <MIcon>
            <component :is="comp" />
          </MIcon>
          <span>{{ name }}</span>
        </li>
      </ul>
    </div>
    <div :class="$style.collectionItem">
      <h3>多媒体音乐</h3>
      <ul :class="$style.grid" class="vp-raw">
        <li v-for="([name, comp], index) in mediaIcons" :key="index">
          <MIcon>
            <component :is="comp" />
          </MIcon>
          <span>{{ name }}</span>
        </li>
      </ul>
    </div>
    <div :class="$style.collectionItem">
      <h3>办公文档</h3>
      <ul :class="$style.grid" class="vp-raw">
        <li v-for="([name, comp], index) in officeIcons" :key="index">
          <MIcon>
            <component :is="comp" />
          </MIcon>
          <span>{{ name }}</span>
        </li>
      </ul>
    </div>
    <div :class="$style.collectionItem">
      <h3>编辑</h3>
      <ul :class="$style.grid" class="vp-raw">
        <li v-for="([name, comp], index) in editIcons" :key="index">
          <MIcon>
            <component :is="comp" />
          </MIcon>
          <span>{{ name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style module>
.contianer {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  cursor: pointer;
  border-bottom:1px solid #dccfeb;
}

.grid li {
  aspect-ratio: 1 / 0.8;
  /* 保持宽高比*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-left: 1px solid #dccfeb;
  border-top: 1px solid #dccfeb;
  border-bottom:1px solid #dccfeb;
}
.grid li:last-child {
  border-right: 1px solid #dccfeb;
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
