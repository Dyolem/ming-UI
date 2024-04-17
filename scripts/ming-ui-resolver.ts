import type { ComponentResolver } from 'unplugin-vue-components/types'

export function mingUIResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve(name) {
      if (name.startsWith('M')) {
        return {
          name,
          from: 'ming-UI',
        }
      }
    },
  }
}
