# Icon 图标

## 快速开始

欢迎使用 @ming-UI/icons，一个为 Vue 应用设计的全面而优雅的图标组件库。本库旨在提供易于使用的图标组件，帮助您快速集成高质量的图标到您的 Vue 应用中。

## 安装

首先，您需要通过 `npm` 或 `yarn` 安装 `@ming-UI/icons`：

```js
npm install @ming-UI/icons
# 或者使用 yarn
yarn add @ming-UI/icons
```

## 引入并使用

在您的 Vue 应用中，您可以轻松地将 `@ming-UI/icons` 集成进来。按照以下步骤操作：
导入图标库：在您的主入口文件（通常是 `main.js` 或 `main.ts`）中导入 `@ming-UI/icons`。
安装图标组件库：使用 `app.use()` 方法安装图标库，这将全局注册所有的图标组件，使它们在整个 Vue 应用中可用。
示例代码如下：

```js
import { createApp } from 'vue'
import icons from '@ming-UI/icons'
import App from './App.vue'

// 步骤 1: 导入 @ming-UI/icons

// 步骤 2: 安装图标组件库
const app = createApp(App)
app.use(icons)

app.mount('#app')
```

完成以上步骤后，@ming-UI/icons 图标库即成功集成到您的 Vue 应用中。现在，您可以在任何组件内自由使用图标组件，无需进一步的导入或注册。

## 使用图标

图标组件库安装后，可直接在模板中通过注册的图标组件名使用各个图标。例如：
<demo src="./demos/basic.vue"></demo>

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
    <m-icon>
      <Like />
    </m-icon>
    <span>like</span>
  </li>
  <li>
    <m-icon>
      <Mute />
    </m-icon>
    <span>Mute</span>
  </li>
  <li>
    <m-icon>
      <Download />
    </m-icon>
    <span>Download</span>
  </li>
  <li>
    <m-icon>
      <Pause />
    </m-icon>
    <span>Pause</span>
  </li>
  <li>
    <m-icon>
      <PlayOne />
    </m-icon>
    <span>PlayOne</span>
  </li>
  <li>
    <m-icon>
      <VoiceOne />
    </m-icon>
    <span>VoiceOne</span>
  </li>
  <li>
    <m-icon>
      <VolumnDown />
    </m-icon>
    <span>VolumnDown</span>
  </li>
  <li>
    <m-icon>
      <VolumnUp />
    </m-icon>
    <span>VolumnDown</span>
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

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| fill     | 闭合曲线图标内部的填充色     | String | 'none' |
| size     | SVG 图标的大小，size x size | `number` \| `string` | 16 |
| color | SVG 图标的轮廓颜色 | String   | #333   |
