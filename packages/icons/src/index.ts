import type { App } from 'vue'
import MIcon from './MIcon.vue'
import SvgIcon from './SvgIcon.vue'
import Like from './icon/Like.vue'
import Download from './icon/Download.vue'
import Mute from './icon/Mute.vue'
import Pause from './icon/Pause.vue'
import PlayOne from './icon/PlayOne.vue'
import VoiceOne from './icon/VoiceOne.vue'
import VolumeDown from './icon/VolumeDown.vue'
import VolumeUp from './icon/VolumeUp.vue'
import ColorExtractor from './icon/ColorExtractor.vue'
import BookMark from './icon/BookMark.vue'
import BookMarkOne from './icon/BookMarkOne.vue'

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
  VolumeDown,
  VolumeUp,
  ColorExtractor,
  BookMark,
  BookMarkOne,
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
  VolumeDown,
  VolumeUp,
  ColorExtractor,
  BookMark,
  BookMarkOne,
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
