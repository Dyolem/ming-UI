## 基础使用

---

hello: world
---

<script setup>
import { ref } from 'vue'

const count = ref(0)

async function copyIconsName(event) {
  const content = `<M${event.target?.innerText} />`
  const type = "text/plain";
  const blob = new Blob([content], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  await navigator.clipboard.write(data);
}

</script>

## 图标集合

<ul :class="$style.grid" class="vp-raw" @click="copyIconsName($event)">
  <li>
    <MLike />
    <span>Like</span>
  </li>
  <li>
    <MMute />
    <span>like</span>
  </li>
  <li>
    <MDownload />
    <span>Download</span>
  </li>
  <li>
    <MPause />
    <span>Pause</span>
  </li>
  <li>
    <MPlayOne />
    <span>PlayOne</span>
  </li>
  <li>
    <MVoiceOne />
    <span>VoiceOne</span>
  </li>
  <li>
    <MVolumnDown />
    <span>VolumnDown</span>
  </li>
   <li>
    <MVolumnUp />
    <span>VolumnUp</span>
  </li>

</ul>

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
</style>
