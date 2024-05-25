# Control Panel 控制板

该组件类似于滑块组件，但是增加了在二维平面上移动的功能。滑块移动时将向外传递滑块当前在水平和垂直方向上的进度值。

## 数据传递

组件将以对象形式暴露出滑块的当前进度数据，包含两个属性：`horizontalDistanceRatio`和`verticalDistanceRatio`。`horizontalDistanceRatio`表示水平方向上的进度，`verticalDistanceRatio`表示垂直方向上的进度。
你可以使用`v-model`绑定该对象以此控制滑块移动，或者直接更改`modelValue`对象的值也可控制滑块移动。

另外在一维移动的模式下，另一维度的属性值在逻辑上是无效的，它也不应该有效，所以在组件内部它将被处理为0后传递到外部。注意在组件首次渲染时，它是无法被处理为0的，只有移动滑块后才会置为0，因此这里强烈建议不要传递无用维度的属性值。

如果传递的属性名称不符合组件要求，或者属性值不是`number`类型，组件将把该属性的值置为0。

<demo src="../../examples/control-panel/data.vue"></demo>
::: tip
`model-value`属性和`v-model`如果同时设置，在组件初始化时，前者会覆盖后者的值。而当后者明确设置为`v-model:modelValue`时，后者会覆盖前者的值。因此不建议`model-value`属性和`v-model`同时设置。
:::

## 基础使用

### 一维滑动

滑块默认在一个维度，即水平方向上滑动。若传递初始值，必须是包含`horizontalDistanceRatio`的对象，`verticalDistanceRatio` 属性可以选择不传递,传递了也会处理为0。(垂直模式下必须是包含`verticalDistanceRatio`属性的对象，因为垂直方向的数值才是有意义的)
<demo src="../../examples/control-panel/basic.vue"></demo>

### 二维滑动

设置`dimensionalMovement`属性为true后，滑块可在二维平面内移动，移动范围为背景板范围。由于此时已不再是单纯的在一个维度上移动，轨道将会自动隐藏，可通过设置`displayTrack`为true来强制显示。
<demo src="../../examples/control-panel/dimensionalMovement.vue"></demo>

二维滑动提供了更强大数据联系，可以利用坐标计算更多的值，比如色板组件就是在控制板组件基础上开发的。
<demo src="../../examples/control-panel/colorPicker.vue"></demo>

## 样式

### 背景板

配置 `backgroundStyle`对象可以自由控制滑块下层的背景板样式,背景板的水平和垂直长度即是滑块可在水平和垂直移动的范围。
有了背景，你可以自由将移动距离和背景产生关联，比如色板可以根据移动距离计算色值。
<demo src="../../examples/control-panel/backgroundBoardStyle.vue"></demo>

### 滑块轨道

配置 `trackBackgroundColor`和`trackThickness`属性可以分别控制滑块轨道背景颜色以及轨道粗度。滑块直径将随着轨道高度按一定比例增大。
<demo src="../../examples/control-panel/trackStyle.vue"></demo>

### 自定义滑块

通过`slider-icon`插槽，可以完全自定义滑块，不受组件内部样式约束。另外还可以设置`sliderRotate`属性，传递滑块的顺时针旋转度数。
<demo src="../../examples/control-panel/slot.vue"></demo>

::: tip
自定义的滑块大小将不会受到控制，不会随着轨道粗度按一定比例增大。
:::

## 垂直模式

设置`vertical`属性为`true`可竖直放置控制板组件。
<demo src="../../examples/control-panel/vertical.vue"></demo>

::: warning
在垂直模式下，滑块移动方向为从下往上滑动，坐标将会不断递增。二维滑动模式下不存在垂直模式。
:::

## 文字提示

当鼠标覆于滑块上方时，会默认显示tooltip，可设置`placement`控制其显示位置。设置`display-tooltip`为`false`可关闭tooltip。

默认的tooltip内容为当前滑块对应维度的进度值。可设置`formatter-tooltip`属性，传递一个自定义格式函数控制显示内容：一维模式下，函数会提供一个参数，该参数对应于当前维度的进度值，比如在垂直模式下，这个参数的值为`verticalDistanceRatio`属性值；二维模式下函数会提供两个参数，分别对应`horizontalDistanceRatio`，`verticalDistanceRatio`属性。函数返回值必须为`string`类型，否则tooltip内容将被处理为空字符串。
<demo src="../../examples/control-panel/tooltip.vue"></demo>

## 坐标系

本组件内部涉及的坐标计算以视口坐标系为参考系，如果更改了组件的参考系，比如父组件使用了`transform:rotate(90deg)`,这将导致内部计算错误。

解决办法：给控制板组件套一层占位组件，设置`transform:rotate(-90deg)`，抵消外部组件的影响，以此来保持控制板组件的参考系的正确性。

<demo src="../../examples/control-panel/rotate.vue"></demo>

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| model-value / v-model |  绑定滑块移动距离  | object | `{traveledDistance:0`，`verticalToTraveledDistance:0}` |
| dimensional-movement | 二维平面移动模式 |  Boolean  | false |
| background-style  | 背景板样式 | number | 10 |
| display-track  | 显示滑块轨道，二维移动模式下默认为`false` | Boolean | true |
| track-thickness  | 控制轨道粗度 | number | 10 |
| track-background-color  | 轨道的背景颜色样式 | string | `var(--ming-color-primary)` |
| vertical  | 垂直模式 | Boolean | false |
| slider-rotate  | 自定义滑块的旋转度数 | number | 0 |
| display-tooltip  | 滑块当前位置的文字提示 | Boolean | true |
| display-tooltip  | 文字提示的显示位置 | `top` \| `top-start` \| `top-end` \| `bottom` \| `bottom-start` \| `bottom-end` \| `left` \| `left-start` \| `left-end` \| `right` \| `right-start` \| `right-end` | bottom |
| formatter-tooltip  | 自定义文字提示内容 | `(...args: number[]) => string` | -- |

### Events

| 事件名     | 说明               | 类型                             |
| -------- | ------------------ | -------------------------------- |
| drag |  拖动滑块触发  | `(value:object) => void` |

### Slots

| 名称     | 说明               |
| -------- | ------------------ |
| slider-icon  | 自定义滑块组件   |

### Exposes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| travelMax |  滑块在水平方向上可移动的最大距离  | number | 0 |
| verticalMax | 滑块在垂直方向上可移动的最大距离 | number | 0 |
