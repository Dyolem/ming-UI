import type { App } from 'vue'
import SvgIcon from './SvgIcon.vue'

// 导入SVG图标注册脚本
import 'virtual:svg-icons-register'

// 图标组件对象
const icons = {
  SvgIcon,
  // ...其他图标组件
}
export {
  SvgIcon,
}

// 全局注册函数
export function installIcons(app: App): void {
  Object.entries(icons).forEach(([iconName, iconComponent]) => {
    app.component(iconName, iconComponent)
  })
}

// 可选：如果你想让图标库作为插件使用
export default {
  install: (app: App): void => {
    installIcons(app)
  },
}
