# Rate评分

用于评分

## 基础使用

评分默认被分为三个等级，可以利用颜色数组对分数及情感倾向进行分级（默认情况下不区分颜色）。 三个等级所对应的颜色用 `fill-color` 属性设置，而它们对应的两个阈值则通过 `low-threshold` 和 `high-threshold` 设定。

传递`thresholdArr`数组，可以划分更多评分等级。

<demo src="../../examples/rate/basic.vue"></demo>

::: tip
请确保`颜色数组长度`等于`阈值数组长度加一`，如果`颜色数组长度`小于等于`阈值数组长度加一`，缺少的颜色值将以颜色数组最后的一个值为准；如果`颜色数组长度`大于`阈值数组长度加一`，多余的颜色值将被丢弃。
:::

## 尺寸

<demo src="../../examples/rate/size.vue"></demo>

## 允许半选

属性 `allow-half` 允许出现半星。实际使用中建议使用该属性，而不是使用无级打分模式。

<demo src="../../examples/rate/half.vue"></demo>

::: tip
当`allow-half`为false时，评分是无级调节的，为了便于展示，显示精度默认设置成保留一位小数，因此建议总分数除以图标个数的值是一个整数，比如`max`设置为10，`rateIconCount`设置为5
:::

## 得分显示

### 显示精度

在无级调节的模式下，评分实际值的小数位数有很多位，这是组件内部计算导致的，如果实际值的小数位过少，将会导致组件内部出错，因此这里将实际的原生计算值传递给外部，你可以对原生计算值处理格式后自定义显示内容。

当然为了避免手动处理的麻烦，组件内部有内置的显示分数区域，可以通过`score-accuracy`属性来控制评分值的小数位数。

<demo src="../../examples/rate/accuracy.vue"></demo>

### 显示位置

可以通过设置`text-position`属性控制评分值的显示位置。

<demo src="../../examples/rate/position.vue"></demo>

### 插槽

除了显示数字，你还可以通过名字为`text`的作用域插槽自定义显示内容
<demo src="../../examples/rate/text.vue"></demo>

## 可清空

当你再次点击相同的值时，可以将值重置为 0。
<demo src="../../examples/rate/clearable.vue"></demo>

## 只读

只读的评分用来展示分数。为组件设置 disabled 属性表示组件为只读。
<demo src="../../examples/rate/ReadOnly.vue"></demo>

## 更多种类的图标

通过设置`iconComponent`属性，接收一个图标组件对象，可以自定义评分图标。

<demo src="../../examples/rate/MoreIcons.vue"></demo>

除了接收单个图标组件对象，也可以传递包含多个图标组件对象的数组，这在配合评分阈值使用时很有用。
<demo src="../../examples/rate/iconsArr.vue"></demo>

:::warning
传递的图标组件内部实现必须以`<svg></svg>`为根节点，不可放在任何父元素内部，否则评分组件样式将失效。
:::

## 自定义样式

你可以通过设置`fill-color`，`bottom-layer-fill-color`，`stroke`，`grayscale`等一系列属性，自由控制评分图标的样式。
<demo src="../../examples/rate/customizedStyle.vue"></demo>

:::tip
如果将`stroke`属性设置为`none`，`bottom-layer-fill-color`属性值将和`fill-color`属性值一致，同时图标将自动应用0.5数值的灰度滤镜用于显示图标区域。
:::
<demo src="../../examples/rate/contourless.vue"></demo>

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| model-value/v-model | 绑定评分值  | `number` | 10 |
| size | 评分图标的大小，size x size，单位为px | `number` | 20 |
| fill-color | 评分图标内部区域填充颜色 | `string` \| `string[]` | '#F7BA2A'  |
| icon-component | 自定义评分图标 | `Component` \| `Component[]`   | `defaultRateIcon`   |
| bottom-layer-fill-color | 评分图标剩余区域填充颜色 | `string` | 'none'  |
| stroke | 图标轮廓颜色 | `string` | '#d3d6db' |
| stroke-width | 控制图标轮廓粗细 | `number` | 2 |
| allow-half | 是否允许半选 | `boolean` | false |
| max | 最高评分分数 | `number` | 10 |
| rate-icon-count | 评分图标个数 | `number` | 5 |
| clearable | 是否可以重置评分值为 0 | `boolean` | false |
| low-threshold | 低分和中等分数的界限值，值本身被划分在中等分数中 | `number` | 2 |
| high-threshold | 高分和中等分数的界限值，值本身被划分在高分中 | `number` | 3 |
| thresholdArr | 自定义更多评分等级 | `number[]` | `[]` |
| grayscale | 图标的灰度滤镜，当`stroke`为'none'时，会自动应用滤镜 | `number` | false |
| disabled | 组件是否为只读 | `boolean` | false |
| score-accuracy | 控制评分显示的小数位数 | `number` | 1 |
| text-position | 评分分数的显示位置 | `'top'`\|`'bottom'`\|`'left'`\|`'right'` | 'right' |

### Slots

| 名称     | 说明               |
| -------- | ------------------ |
| text | 自定义评分文字内容   |

### Exposes

| 名称     | 说明   | 类型 |
| -------- | ------------------ |--------- |
| resetCurrentScore | 重置评分分数为0 | `()=>void` |
| setCurrentScore | 设置评分分数 | `(value:number)=>void` |
