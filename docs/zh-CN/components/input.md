
# input输入框

通过鼠标或键盘输入字符
::: warning
`input` 为受控组件，它 总会显示 Vue 绑定值。

在正常情况下，`input` 的输入事件应该被正常响应。 它的处理程序应该更新组件的绑定值 (或使用 `v-model`)。 否则，输入框的值将不会改变。

不支持 v-model 修饰符。
:::

## 基础使用

<demo src="../../examples/input/basic.vue"></demo>

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件

<demo src="../../examples/input/disabled.vue"></demo>

## 尺寸

使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large`, `small`。
<demo src="../../examples/input/size.vue"></demo>

## 插槽

<demo src="../../examples/input/slot.vue"></demo>

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| type    | 类型                 | `text` \| `number`              | text   |
| model-value / v-model | 绑定值 | `string` \| `number`             | --   |
| size     | 设置输入框的大小     | `default` \| `small` \| `large`  | default |
| disabled | 设置输入框的禁用状态 | Boolean                          | false   |
| autocomplete | 原生 autocomplete 属性 | `string`   |   off   |
| 原生 max 属性，设置最大值 | 只对特定type的输入框生效 | --   |    --   |
| 原生 min 属性，设置最小值 | 只对特定type的输入框生效 | --   |   --    |
| input-style | 设置输入框的禁用状态 | `object` \| `null`           |   null   |

### Events

| 事件  | 说明             | 类型                  |
| ----- | ---------------- | --------------------- |
| click | 点击时触发的事件 | `(event:Event)=>void` |
| input | 在 Input 值改变时触发 | `(event:Event)=>void` |

### Slots

| 插槽名  | 说明             |
| ----- | ---------------- |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

### Exposes

| 事件  | 说明             | 类型                  |
| ----- | ---------------- | --------------------- |
| focus | 使 input 获取焦点 | `()=>void` |
| blur | 使 input 失去焦点 | `()=>void` |
