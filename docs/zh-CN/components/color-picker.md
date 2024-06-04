# Color Picker 取色器

## 基础使用

### 调色

左侧正方形色板为饱和度和亮度控制区域，右侧长方形彩色条带控制色调选取，拖动圆形滑块即可选择颜色，并将`HSL`，`RGB`，`HEX`三种颜色的表示结果展示在右侧输入框中。
当然你也可以手动输入颜色参数，修改任意参数将会自动更新其余参数和圆形滑块位置。

### 吸取颜色

点击画笔图标即可呼出系统取色器，点击鼠标左键获取当前位置的像素颜色，并将颜色展示在画笔下方的正方形画框内。鼠标悬浮于画框上可获得HEX形式的颜色值，左键点击画框即可复制到剪贴板。

<demo src="../../examples/color-picker/basic.vue"></demo>

### UI切换

取色器首次渲染默认以完整功能展示，但有时只是为了简单获取当前位置的颜色，并不需色板以及更多参数。这时可以给`fullFunction`属性传递`false`，取色器首次展示将以简约形式呈现，只提供吸取颜色功能。
如果需要完整使用功能，长按画笔图标0.5s即可打开色板。再次长按会切换回简约模式。

::: tip
取色器组件在不同模式下的宽高会动态变化，会影响周围元素排列，使用该组件时需注意布局方式。
后续演示都以简约风格展示。
:::

### 关闭组件

设置`enableClose`属性为true后，双击画笔下方的小画框可关闭组件。
<demo src="../../examples/color-picker/close.vue"></demo>

### 插槽

传递图标可以替换默认的画笔图标，推荐使用组件库配套的图标，当然你也可以自行传递任意图标

<demo src="../../examples/color-picker/slot.vue"></demo>

<!-- ## 命令式调用

除了以模板声明的方式直接使用组件，还可以以命令的方式调用组件。

<demo src="../../examples/color-picker/command.vue"></demo> -->

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| enableClose | 是否启用销毁组件功能     | Boolean | false |
| fullFunction     | 首次渲染是否以完整功能展示 | Boolean | true |
| effect | tooltip的背景颜色 | `dark`   \| `light`   | dark |

### Events

| 事件名     | 说明               | 类型                             |
| -------- | ------------------ | -------------------------------- |
| update:color |  任一颜色参数变化时，向外传递的所有形式的颜色值  | emit |

### Slots

| 名称     | 说明               |
| -------- | ------------------ |
| default  | 替换画笔图标   |