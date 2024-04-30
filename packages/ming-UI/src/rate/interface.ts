import type { DefineComponent } from 'vue'

export interface rateProps {
  modelValue: number
  size?: number
  iconComponent?: DefineComponent<any, any, any, any>
  fillColor?: string
  bottomLayerFillColor?: string
  stroke?: string
  strokeWidth?: number
  allowHalf?: boolean
  max?: number
  rateIconCount?: number
  grayscale?: number
  clearable?: boolean
}

export interface rateItemProps extends Omit<rateProps, 'modelValue' | 'clearable'> {
  id: number
  score?: number
}
