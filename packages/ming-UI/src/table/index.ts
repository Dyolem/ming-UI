import type { App, Plugin } from 'vue'
import Table from './table.tsx'

(Table as unknown as Plugin).install = (app: App) => {
  app.component(Table.name as string, Table)
}

export default Table
