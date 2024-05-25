
# Tooltip文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础使用

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement属性值为：`[方向]-[对齐位置]；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

<demo src="../../examples/tooltip/basic.vue"></demo>

## 主题

Tooltip 组件内置了两种主题：`dark`和`light`。除了内置主题，同时支持自定义主题：`customized`包含组件基本样式，`fullCustomized`可以完全自由的控制样式。

::: tip
当使用了tooltip的组件开启了样式隔离（scoped）时，如果要使用自定义主题，请对tooltip组件使用样式穿透。
:::

通过设置 `effect` 来修改主题，默认值为 `dark`。
<demo src="../../examples/tooltip/topic.vue"></demo>

## 触发模式

tooltip组件提供了`click`和`hover`两种触发模式。
<demo src="../../examples/tooltip/trigger.vue"></demo>

## 插槽

可自定义文字提示内容。若提供了插槽内容，会覆盖content传递的内容。

<demo src="../../examples/tooltip/slot.vue"></demo>

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| placement | Tooltip 组件出现的位置 | `top` \| `top-start` \| `top-end` \| `bottom` \| `bottom-start` \| `bottom-end` \| `left` \| `left-start` \| `left-end` \| `right` \| `right-start` \| `right-end` | bottom |
| trigger | 如何触发 Tooltip | `click` \| `hover` |   false   |
| content | 显示的内容，也可被 slot#content 覆盖 | String | '' |
| effect | Tooltip 主题 | `dark` \| `light` \| `customized` \| `fullCustomized`| dark |

### Slots

| 插槽名  | 说明             |
| ----- | ---------------- |
| content | 自定义内容 |

### Exposes

| 事件  | 说明             | 类型                  |
| ----- | ---------------- | --------------------- |
