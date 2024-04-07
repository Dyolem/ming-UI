interface BackgroundStyle {
  width?: string
  height?: string
  [key: string]: string | undefined // 允许用户定义额外的样式属性
}
type placementType = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
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
  trackBackgroundColor?: string
  sliderRotate?: number
  trackHeight?: number
  displayTooltip?: boolean
  formatterTooltip?: (...args: number[]) => ({ traveledDistance: number;verticalToTraveledDistance: number } | string)
  placement?: placementType
}
