type hexParameterType = number
export function useRgbToHex(r: hexParameterType, g: hexParameterType, b: hexParameterType): string {
  // 将单个颜色值转换为两位的十六进制数

  const toHex = (color: number) => color.toString(16).padStart(2, '0')

  // 组合成完整的Hex颜色代码
  return `${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function useHexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // 检查输入是否为有效的十六进制颜色值
  if (hex.startsWith('#'))
    hex = hex.substring(1)

  if (hex.length !== 6)
    return null

  // 解析十六进制颜色值
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)

  return { r, g, b }
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

export function useRgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  // 将RGB值从0-255转换为0-1
  r /= 255
  g /= 255
  b /= 255

  // 找到最大和最小的RGB值
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h: number = 0 // 初始化h
  let s: number, l: number

  // 亮度是最大和最小RGB值的平均值
  l = (max + min) / 2

  if (max === min) {
    // 如果所有颜色值都相等，那么色相为0，饱和度为0
    s = 0
  }
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  // 将色相转换为角度
  h = Math.round(h * 360)
  // 将饱和度和亮度值转换为百分比
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return { h, s, l }
}
