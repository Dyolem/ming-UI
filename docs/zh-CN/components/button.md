
# Button按钮

## 基础用法

<demo src="../../examples/button/basic.vue"></demo>

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。
使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。
<demo src="../../examples/button/disabled.vue"></demo>

## 调整尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。
使用 `size` 属性额外配置尺寸，可使用 `large`和`small`两种值。
<demo src="../../examples/button/size.vue"></demo>

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| type     | 设置按钮的类型     | `default` \| `primary` \| `dashed` | default |
| size     | 设置按钮的大小     | `default` \| `small` \| `large`    | default |
| disabled | 设置按钮的禁用状态 | Boolean                          | false   |

### Slots

| 插槽名  | 说明             |
| ----- | ---------------- |
| default | 自定义默认内容 |

### Events

| 事件  | 说明             | 类型                  |
| ----- | ---------------- | --------------------- |
| click | 点击时触发的事件 | `(event:Event)=>void` |
