import type { App } from 'vue'
import ColorPicker from './ColorPicker.vue'

import ColorPickerPlugin from './colorPickerPlugin'

ColorPicker.install = (app: App) => {
  app.component(ColorPicker.name as string, ColorPicker)
  app.use(ColorPickerPlugin)
}

export default ColorPicker
