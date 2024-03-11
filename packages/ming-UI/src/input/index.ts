import type { App } from 'vue'
import Input from './input.vue'

Input.install = (app: App) => {
  app.component(Input.name as string, Input)
}

export default Input
