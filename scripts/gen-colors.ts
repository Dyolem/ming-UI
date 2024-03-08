import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { gold, green, purple, red } from '@ant-design/colors'

// 生成css文件的地址
const baseUrl = fileURLToPath(new URL('../', import.meta.url))
const cssFileUrl = path.resolve(baseUrl, 'packages/ming-UI/src/style/theme/colors.css')

// 色彩语义集合，后续增加颜色只需在下面集合中添加数组
type mapType = Map<string, string[]>
const colorSemanticsMap: mapType = new Map([
  ['primary', purple],
  ['success', green],
  ['warning', gold],
  ['error', red],
])

// 利用色彩语义集合创建css变量
function generateCssVariable(colorMap: mapType): string {
  let cssVariables = ''
  for (const [colorName, colorValues] of colorMap) {
    colorValues.forEach((colorValue, index) => {
      cssVariables += `--ming-color-${colorName}-${index + 1}: ${colorValue};\n`
    })
  }
  return `:root {\n${cssVariables}}`
}

// 创建文件
try {
  const cssFileContent = generateCssVariable(colorSemanticsMap)
  fs.writeFileSync(cssFileUrl, cssFileContent)
}
catch (error) {
  console.error('Failed to write CSS file:', error)
}
