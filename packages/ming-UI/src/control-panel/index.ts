import type { App } from 'vue'
import ControlPanel from './ControlPanel.vue'

ControlPanel.install = (app: App) => {
  app.component(ControlPanel.name as string, ControlPanel)
}

export default ControlPanel
