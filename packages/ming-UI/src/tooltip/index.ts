import type { App } from 'vue'
import Tooltip from './tooltip.tsx'

Tooltip.install = (app: App) => {
  app.component(Tooltip.name as string, Tooltip)
}

export default Tooltip
