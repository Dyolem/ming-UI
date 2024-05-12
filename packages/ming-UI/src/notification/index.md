# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基本使用

Ming-UI 注册了 `notify` 方法并且它接受一个 `Object` 作为其参数。 在最简单的情况下，你可以通过设置 `title` 和 `message` 属性来设置通知的标题和正文内容。 默认情况下，通知在3000毫秒后自动关闭，但你可以通过设置 `duration` 属性来自定义通知的展示时间。 如果你将它设置为 `0`，那么通知将不会自动关闭。 需要注意的是 `duration` 接收一个 `number`类型的值，单位为毫秒。
<demo src="./demos/basic.vue"></demo>

## 不同类型的通知

组件提供了四种不同类型的提醒框：`success`、`warning`、`info` 和`error`，可以通过`type`属性来控制。如果未手动传递值或者传递值不符合要求，类型默认为`info`类型
<demo src="./demos/types.vue"></demo>

## 正文内容

正文内容支持三种类型的值：`字符串`，`vNode类型`的值（可以是组件，也可以是h函数渲染的结果），`HTML片段`。如果要渲染HTML片段，请将`dangerouslyUseHTMLString`属性置为`true`。
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

## 隐藏关闭按钮

通知的关闭按钮可以被设置为隐藏。

将 showClose 属性设置为 false 即可隐藏关闭按钮。

<demo src="./demos/closeButton.vue"></demo>
