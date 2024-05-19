export interface ColorPickerProps {
  enableClose?: boolean
  fullFunction?: boolean
  effect?: 'dark' | 'light'
}
export interface ratioType {
  horizontalDistanceRatio: number
  verticalDistanceRatio: number
}

export interface colorManagerType {
  hsl: {
    h: number
    s: number
    l: number
  }
  rgb: {
    r: number
    g: number
    b: number
  }
  hex: string
}
