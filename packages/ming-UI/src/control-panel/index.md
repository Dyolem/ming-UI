# Control Panel 控制板

该组件类似于滑块组件，但是可以在二维平面上移动，拥有更强的功能。滑块移动时将向外传递滑块相对于整个组件的横纵坐标。

## 基础使用

通过设置绑定值自定义滑块的初始值,传递的初始值必须是包含`traveledDistance`和`verticalToTraveledDistance` 属性的对象，`traveledDistance`表示沿滑动轴线移动的距离，`verticalToTraveledDistance`表示垂直于滑动轴线方向移动的距离，`verticalToTraveledDistance`将在开启`二维移动`后生效。

<demo src="./demos/basic.vue"></demo>

## 样式

### 背景板

配置 `backgroundStyle`对象可以自由控制滑块下层的背景板样式，背景板的宽度即是滑块在滑动轴线上的最大移动距离。背景板的范围即是滑块可移动的范围。
有了背景，你可以自由将移动距离和背景产生关联，比如色板可以根据移动距离计算色值。
<demo src="./demos/backgroundBoardStyle.vue"></demo>

### 滑块轨道

配置 `trackBackgroundColor`和`trackHeight`属性可以分别控制滑块轨道背景颜色以及轨道高度。滑块直径将随着轨道高度按一定比例增大。
<demo src="./demos/trackStyle.vue"></demo>

### 自定义滑块

通过`slider-icon`插槽，可以完全自定义滑块，不受组件内部样式约束。另外还可以设置`sliderRotate`属性，传递滑块的顺时针旋转度数。
<demo src="./demos/slot.vue"></demo>

::: tip
自定义的滑块大小将不会受到控制，不会随着轨道高度按一定比例增大。
:::

## 二维滑动

设置`dimensionalMovement`属性为true后，滑块可在二维平面内移动，移动范围为背景板范围。由于此时已不再是单纯的在轨道上移动，轨道将会自动隐藏，可通过设置`displayTrack`为true来强制显示。
<demo src="./demos/dimensionalMovement.vue"></demo>

二维滑动提供了更强大数据联系，可以利用坐标计算更多的值，比如色板组件就是在控制板组件基础上开发的。
<demo src="./demos/colorPicker.vue"></demo>

## 垂直模式

设置`vertical`属性为`true`可竖直放置控制板组件。
<demo src="./demos/vertical.vue"></demo>

::: warning
在垂直模式下，如果需要添加背景板样式，需要特别注意：`width`属性控制的是竖直方向上的长度，而`height`控制的才是水平方向上的宽度。
:::

<demo src="./demos/slot.vue"></demo>

## 数据传递

组件将以对象形式暴露出滑块的当前位置数据，`traveledDistance`表示沿滑动轴线移动的距离，`verticalToTraveledDistance`表示垂直于滑动轴线方向移动的距离。因此要特别注意，在垂直模式下，竖直方向是轴线方向。
单向传递数据时，外部组件可接收响应式的位置数据。双向绑定时，可在外部通过更改位置数据来控制滑块移动。

<demo src="./demos/data.vue"></demo>
::: tip
`model-value`属性和`v-model`如果同时设置，在组件初始化时，前者会覆盖后者的值。而当后者明确设置为`v-model:modelValue`时，后者会覆盖前者的值。因此不建议`model-value`属性和`v-model`同时设置。
:::

## 文字提示

开启tooltip可以显示当前滑块位置
<demo src="./demos/tooltip.vue"></demo>

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| model-value / v-model |  绑定滑块移动距离  | object | `traveledDistance:0`,`verticalToTraveledDistance:0` |
| dimensional-movement | 二维平面移动模式 |  Boolean  | false |
| background-style  | 背景板样式 | number | 10 |
| display-track  | 显示滑块轨道，二维移动模式下默认为`false` | Boolean | true |
| track-height  | 控制轨道高度 | number | 10 |
| track-background-color  | 轨道的背景颜色样式 | string | `var(--ming-color-primary)` |
| vertical  | 垂直模式 | Boolean | false |
| slider-rotate  | 自定义滑块的旋转度数 | number | 0 |

### Events

| 事件名     | 说明               | 类型                             |
| -------- | ------------------ | -------------------------------- |
| drag |  拖动滑块触发  | `(value:object) => void` |

### Slots

| 名称     | 说明               |
| -------- | ------------------ |
| slider-icon  | 自定义滑块组件   |
