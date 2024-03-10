import type { App } from 'vue'
import Button from './button.vue'

Button.install = (app: App) => {
  app.component(Button.name as string, Button)
}

export default Button
