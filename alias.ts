import { fileURLToPath } from 'node:url'
import path from 'node:path'

const baseUrl = fileURLToPath(new URL('.', import.meta.url))
export default [
  {
    find: /^ming-UI/,
    replacement: path.resolve(baseUrl, 'packages/ming-UI/src'),
  },
  {
    find: /^@ming-UI\/utils/,
    replacement: path.resolve(baseUrl, 'packages/utils/src'),
  },
  {
    find: /^@ming-UI\/icons/,
    replacement: path.resolve(baseUrl, 'packages/icons/src'),
  },
]
