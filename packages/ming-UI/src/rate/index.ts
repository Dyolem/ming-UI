import type { App } from 'vue'
import Rate from './Rate.vue'

Rate.install = (app: App) => {
  app.component(Rate.name as string, Rate)
}

export default Rate
export { Rate }
