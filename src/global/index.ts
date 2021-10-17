import { registerElement } from './register-element'
import { App } from 'vue'

export function registerApp(app: App): void {
  registerElement(app)
}
