# Icon 图标

## 快速开始

欢迎使用 @vue-ming-elements/icons，一个为 Vue 应用设计的全面而优雅的图标组件库。本库旨在提供易于使用的图标组件，帮助您快速集成高质量的图标到您的 Vue 应用中。

## 安装

首先，您需要通过 `npm` 或 `yarn` 安装 `@vue-ming-elements/icons`：

```js
npm install @vue-ming-elements/icons
# 或者使用 yarn
yarn add @vue-ming-elements/icons
```

## 引入并使用

在您的 Vue 应用中，您可以轻松地将 `@vue-ming-elements/icons` 集成进来。按照以下步骤操作：
导入图标库：在您的主入口文件（通常是 `main.js` 或 `main.ts`）中导入 `@vue-ming-elements/icons`。
安装图标组件库：使用 `app.use()` 方法安装图标库，这将全局注册所有的图标组件，使它们在整个 Vue 应用中可用。
示例代码如下：

```js
import { createApp } from 'vue'
import icons from '@vue-ming-elements/icons'
import App from './App.vue'

// 步骤 1: 导入 @vue-ming-elements/icons

// 步骤 2: 安装图标组件库
const app = createApp(App)
app.use(icons)

app.mount('#app')
```

完成以上步骤后，`@vue-ming-elements/icons` 图标库即成功集成到您的 Vue 应用中。现在，您可以在任何组件内自由使用图标组件，无需进一步的导入或注册。

当然您也可以从`@vue-ming-elements/icons` 图标库按需导入图标。

## 使用图标

图标组件库安装后，可通过以下两种方式使用图标。

### 直接使用SVG图标

::: tip
为了使用的灵活性，除了`viewBox`属性，SVG图标不含其他任何属性，可根据需要自行控制样式。
如果您直接使用原生图标时，发现图标未显示，可能是因为您忘记了添加 `stroke`属性哦 :hand:
:::

<div :class="$style.box">
      <Like height="1rem" width="1rem" fill="none" stroke="#333" stroke-width="4" />
      <Pause height="1rem" width="1rem" fill="none" stroke="#333" stroke-width="4" />
      <VolumeUp height="1rem" width="1rem" fill="none" stroke="#333" stroke-width="4" />
      <Mute height="1rem" width="1rem" fill="none" stroke="#333" stroke-width="4" />
</div>

```js
<div>
  <Like height="1rem" width="1rem" fill="none" stroke="#333" stroke-width="4" />
  <Pause height="1rem" width="1rem" fill="none" stroke="#333" stroke-width="4" />
  <VolumeUp height="1rem" width="1rem" fill="none" stroke="#333" stroke-width="4" />
  <Mute height="1rem" width="1rem" fill="none" stroke="#333" stroke-width="4" />
</div>
```

### 结合m-icon使用

为了避免手动设置图标样式的麻烦，可以用`<m-icon></m-icon>`将原生SVG图标包裹，享受默认样式以及更灵活的使用方式。
  <div :class="$style.box">
    <m-icon>
      <Like />
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

```js
  <div class="box">
    <m-icon>
      <Like />
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
```

::: tip
结合m-icon使用时，如果同时给原生SVG直接设置属性，直接设置的属性并不会生效。
:::
<demo src="./demos/basic.vue"></demo>

## 图标集合

<script setup>
import { useClipBoard } from '@ming-UI/utils'

function copyIconsName(event) {
  if(event.target?.innerText ===undefined) return
    const content = `<m-icon><${event.target?.innerText} /></m-icon>`
  useClipBoard(content)
}

</script>

<ul :class="$style.grid" class="vp-raw" @click="copyIconsName($event)">
  <li>
    <m-icon>
      <Like />
    </m-icon>
    <span>Like</span>
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
      <VolumeDown />
    </m-icon>
    <span>VolumeDown</span>
  </li>
  <li>
    <m-icon>
      <VolumeUp />
    </m-icon>
    <span>VolumeUp</span>
  </li>
    <li>
    <m-icon>
      <BookMark />
    </m-icon>
    <span>BookMark</span>
  </li>
  <li>
    <m-icon>
      <BookMarkOne />
    </m-icon>
    <span>BookMarkOne</span>
  </li>
  <li>
    <m-icon>
      <Star />
    </m-icon>
    <span>Star</span>
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
  .box {
      display: flex;
      justify-content: space-around;
      width: 100%;
    }
</style>

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| fill     | 闭合曲线图标内部的填充色     | String | 'none' |
| size     | SVG 图标的大小，size x size | `number` \| `string` | 16 |
| stroke | SVG 图标的轮廓颜色 | String   | #333   |
| strokeWidth | 轮廓粗细 | `number` \| `string` | 4  |

### Slots

| 名称     | 说明               |
| -------- | ------------------ |
| default     | 自定义默认内容   |
