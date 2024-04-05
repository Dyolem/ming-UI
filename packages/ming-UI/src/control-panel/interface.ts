interface BackgroundStyle {
  width?: string
  height?: string
  [key: string]: string | undefined // 允许用户定义额外的样式属性
}

export interface ControlPanelProps {
  vertical?: boolean
  backgroundStyle?: BackgroundStyle // 使用 BackgroundStyle 类型而不是 object
  distanceRatio?: number
  dimensionalMovement?: boolean
  modelValue?: {
    verticalToTraveledDistance: number
    traveledDistance: number
  }
  displayTrack?: boolean
  trackBackground?: { backgroundColor: string }
  hiddenBackgroundBoard?: boolean
  sliderRotate?: number
  trackHeight?: number
}
