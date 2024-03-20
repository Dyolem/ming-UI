import type { App } from 'vue'
import ColorPicker from './ColorPicker.vue'

ColorPicker.install = (app: App) => {
  app.component(ColorPicker.name as string, ColorPicker)
}

export default ColorPicker
