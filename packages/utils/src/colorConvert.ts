type hexParameterType = number
export function userRgbToHex(r: hexParameterType, g: hexParameterType, b: hexParameterType) {
  // 将单个颜色值转换为两位的十六进制数
  const toHex = (color: number) => color.toString(16).padStart(2, '0')

  // 组合成完整的Hex颜色代码
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

type hslParameterType = number
export function useHslToRgb(h: hslParameterType, s: hslParameterType, l: hslParameterType) {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  }
  else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  }
  else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  }
  else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  }
  else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  }
  else if (h >= 300 && h < 360) {
    r = c
    g = 0
    b = x
  }

  // 将计算结果调整回0-255范围，并四舍五入到最接近的整数
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return { r, g, b }
}
