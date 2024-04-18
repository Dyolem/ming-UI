import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

const mingUIDir = fileURLToPath(new URL('../packages/ming-UI', import.meta.url))
// 插件代码，合并ming-ui.css和style.css
export default function mergeStylesPlugin() {
  // 确保提供正确的路径
  const distPath = path.resolve(mingUIDir, 'dist')
  const mingUiCssPath = path.resolve(distPath, 'ming-ui.css')
  const styleCssPath = path.resolve(distPath, 'style.css')

  // 读取ming-ui.css的内容
  const mingUiCssContent = fs.readFileSync(mingUiCssPath, 'utf-8')
  // 读取style.css的内容，需要确保该文件已经由UMD构建生成
  const styleCssContent = fs.readFileSync(styleCssPath, 'utf-8')

  // 合并两个文件的内容
  const mergedStyles = `${mingUiCssContent}\n${styleCssContent}`

  // 输出到新的style.css文件
  fs.writeFileSync(styleCssPath, mergedStyles)

  // 删除旧的ming-ui.css文件
  fs.removeSync(mingUiCssPath)
}
