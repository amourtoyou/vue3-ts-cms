import { ElButton } from 'element-plus'
import { App } from 'vue'

const components = [ElButton]

export function registerApp(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
