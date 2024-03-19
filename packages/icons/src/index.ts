import type { App } from 'vue'
import SvgIcon from './SvgIcon.vue'
import MLike from './icon/Like.vue'
import MDownload from './icon/Download.vue'
import MMute from './icon/Mute.vue'
import MPause from './icon/Pause.vue'
import MPlayOne from './icon/PlayOne.vue'
import MVoiceOne from './icon/VoiceOne.vue'
import MVolumnDown from './icon/VolumnDown.vue'
import MVolumnUp from './icon/VolumnUp.vue'

// 导入SVG图标注册脚本
import 'virtual:svg-icons-register'

// 图标组件对象
const icons = {
  SvgIcon,
  MLike,
  MDownload,
  MMute,
  MPause,
  MPlayOne,
  MVoiceOne,
  MVolumnDown,
  MVolumnUp,
  // ...其他图标组件
}
export {
  SvgIcon,
  MLike,
  MDownload,
  MMute,
  MPause,
  MPlayOne,
  MVoiceOne,
  MVolumnDown,
  MVolumnUp,
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
