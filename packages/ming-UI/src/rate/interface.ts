import type { DefineComponent } from 'vue'

export interface rateProps {
  modelValue: number
  size?: number
  iconComponent?: DefineComponent<any, any, any, any> | DefineComponent<any, any, any, any>[]
  fillColor?: string | string[]
  bottomLayerFillColor?: string
  stroke?: string
  strokeWidth?: number
  allowHalf?: boolean
  max?: number
  rateIconCount?: number
  grayscale?: number
  clearable?: boolean
  lowThreshold?: number
  highThreshold?: number
  thresholdArr?: number[]
  scoreAccuracy?: number
}

export interface rateItemProps extends Omit<rateProps, 'modelValue' | 'fillColor' | 'iconComponent' | 'clearable' | 'lowThreshold' | 'highThreshold' | 'thresholdArr' | 'scoreAccuracy'> {
  id: number
  fillColor?: string
  iconComponent?: DefineComponent<any, any, any, any>
  score?: number
}
