import type { Component } from 'vue'

export interface rateProps {
  modelValue: number
  size?: number
  iconComponent?: Component | Component []
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
  disabled?: boolean
  textPosition?: 'top' | 'bottom' | 'left' | 'right'
}

export interface rateItemProps extends Omit<rateProps, 'modelValue' | 'fillColor' | 'iconComponent' | 'clearable' | 'lowThreshold' | 'highThreshold' | 'thresholdArr' | 'scoreAccuracy' | 'textPosition' > {
  id: string
  fillColor?: string
  iconComponent?: Component
  score?: number
}
