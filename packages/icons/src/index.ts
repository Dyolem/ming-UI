import type { App } from 'vue'
import MIcon from './MIcon.vue'
import SvgIcon from './SvgIcon.vue'
import Like from './icon/Like.vue'
import Download from './icon/Download.vue'
import Mute from './icon/Mute.vue'
import Pause from './icon/Pause.vue'
import PlayOne from './icon/PlayOne.vue'
import VoiceOne from './icon/VoiceOne.vue'
import VolumnDown from './icon/VolumnDown.vue'
import VolumnUp from './icon/VolumnUp.vue'

// 导入SVG图标注册脚本
import 'virtual:svg-icons-register'

// 图标组件对象
const icons = {
  MIcon,
  SvgIcon,
  Like,
  Download,
  Mute,
  Pause,
  PlayOne,
  VoiceOne,
  VolumnDown,
  VolumnUp,
  // ...其他图标组件
}
export {
  MIcon,
  SvgIcon,
  Like,
  Download,
  Mute,
  Pause,
  PlayOne,
  VoiceOne,
  VolumnDown,
  VolumnUp,
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
