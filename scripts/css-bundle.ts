import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import less from 'less'

const mingUIDir = fileURLToPath(new URL('../packages/ming-UI', import.meta.url))

const lessFiles = fg.sync([
  'src/**/style/index.less',
  '!src/style',
], {
  cwd: mingUIDir,
})

async function compile() {
  for (const file of lessFiles) {
    const filePath = path.resolve(mingUIDir, file)
    const lessCode = fs.readFileSync(filePath, 'utf-8')

    const cssCode = await less.render(lessCode, {
      paths: [path.dirname(filePath)],
    })
    const esDir = path.resolve(mingUIDir, `./es${file.slice(3, file.length - 4)}css`)
    const libDir = path.resolve(mingUIDir, `./lib${file.slice(3, file.length - 4)}css`)
    fs.outputFileSync(esDir, cssCode.css)
    fs.outputFileSync(libDir, cssCode.css)
  }
}
compile()
