# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基本使用

Ming-UI 注册了 `notify` 方法并且它接受一个 `Object` 作为其参数。 在最简单的情况下，你可以通过设置 `title` 和 `message` 属性来设置通知的标题和正文内容。 默认情况下，通知在3000毫秒后自动关闭，但你可以通过设置 `duration` 属性来自定义通知的展示时间。 如果你将它设置为 `0`，那么通知将不会自动关闭。 需要注意的是 `duration` 接收一个 `number`类型的值，单位为毫秒。
<demo src="./demos/basic.vue"></demo>

## 不同类型的通知

组件提供了四种不同类型的提醒框：`success`、`warning`、`info` 和`error`，可以通过`type`属性来控制。如果未手动传递值或者传递值不符合要求，类型默认为`info`类型
<demo src="./demos/types.vue"></demo>

## 标题与通知栏内容

标题与通知栏内容均支持传入三类形式的值：`字符串`，`vNode类型`的值（可以是组件，也可以是h函数渲染的结果），`HTML片段`。如果要渲染HTML片段，请将`dangerouslyUseHTMLString`属性置为`true`。
<demo src="./demos/content.vue"></demo>

:::warning
`content` 属性虽然支持传入 `HTML` 片段，但是在网站上动态渲染任意 `HTML` 是非常危险的，因为容易导致 `XSS` 攻击。 因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `content` 的内容是可信的，永远不要将用户提交的内容赋值给 `content` 属性。
:::

## 自定义消息弹出的位置

可以让 `Notification` 从屏幕四角中的任意一角弹出

使用 `position` 属性设置 `Notification` 的弹出位置， 支持四个选项：`top-right`、`top-left`、`bottom-right` 和 `bottom-left`， 默认为 `top-right`。

<demo src="./demos/position.vue"></demo>

## 有位置偏移的通知栏

能够设置偏移量来使 `Notification` 偏移默认位置。

`Notification` 提供设置偏移量的功能，通过设置 offset 字段，可以使弹出的消息距屏幕边缘偏移一段距离。 注意在同一时刻，每一个的 `Notification` 实例应当具有一个相同的偏移量,否则会使用新的通知的偏移量。一个`Notification` 实例可以理解为一个通知队列。根据前面的 `position` 属性，本组件运行时最多存在四个`Notification` 实例。

<demo src="./demos/offset.vue"></demo>

## 关闭通知

调用 `close()` 方法可以关闭对应组件实例中的最先出现的通知。你也可以调用 `closeAll()`方法，直接关闭所有通知。
<demo src="./demos/close.vue"></demo>

:::tip
`close()` 方法还可以接收一个 `number` 类型的参数id，用于关闭对应id的通知。id涉及组件内部实现:id从0开始，随着通知的创建不断加一，当一个实例不存在任何消息时，id会重新置为0。对于组件自身来说是很容易实现的，但是在其他开发者时就需要添加存储更新id的额外代码，因此不建议给`close`方法传递参数。
:::

## 隐藏关闭按钮

通知的关闭按钮可以被设置为隐藏。

将 `showClose` 属性设置为 `false` 即可隐藏关闭按钮。

<demo src="./demos/closeButton.vue"></demo>

## 全局方法

Ming-UI为 `app.config.globalProperties` 添加了全局方法 `$notification` ,你可以获取当前应用实例直接调用`$notification`

<demo src="./demos/globalMethod.vue"></demo>

## 应用程序上下文继承

现在 `MNotification` 接受一条 `context` 作为消息构造器的第二个参数，允许你将当前应用的上下文注入到 `MNotification` 中，这将允许你继承应用程序的所有属性。
<demo src="./demos/appContext.vue"></demo>
:::tip
如果您全局注册了 `MNotification` 组件，它将自动继承应用的上下文环境。
:::

## API

### Attributes

| 属性     | 说明               | 类型                             | 默认值  |
| -------- | ------------------ | -------------------------------- | ------- |
| type | 通知的类型,如不传递则默认为`'info'`类型 | `'success'` \| `'warning'` \| `'info'` \| `'error'` | 'info' |
| title | 标题，若不传递则默认为`'Prompt'` | `string`   \| `vNode`   | 'Prompt' |
| content | 通知栏正文内容 | `string` \| `vNode` | - |
| duration | 显示时间, 单位为毫秒。 值为 `0` 则不会自动关闭 | `number` | 3000 |
| showClose | 是否显示关闭按钮 | `boolean` | true |
| position | 自定义弹出位置     | `'top-right'` \| `'top-left'` \| `'bottom-right'` \| `'bottom-left'` | false |
| offset | 弹出位置距离窗口顶部或者底部的偏移距离 | `number` | 30 |
| icon | 自定义通知图标     | `boolean` | false |
| showIcon | 是否显示通知类型图标 | `boolean` | true |
| appendTo | 设置 `notification` 的根元素，默认为 `document.body` | `HTMLElement` | - |
| dangerouslyUseHTMLString | 是否将 `content` 属性作为 HTML 片段处理 | `boolean` | false |
| onClose | 单个通知关闭时的回调函数,可以使用暴露出的 `id` 值 | `(id?:number)=>void` | - |
| onClick | 点击通知时的回调函数（点击关闭按钮不触发）,可以使用暴露出的 `id` 值 | `(id?:number)=>void` | - |
| zIndex | 自定义通知元素的层级(当 `appendTo` 属性设置的元素层级很低时很有用) | `number` | 100 |

### Methods

| 名称     | 详情               | 类型                             |
| -------- | ------------------ | -------------------------------- |
| close | 关闭对应组件实例中的最先出现的通知,传递id可以关闭当前实例中对应id的通知 | `(id?:number)=>void` |
| closeAll | 关闭所有实例创建的通知 | `()=>void` |
