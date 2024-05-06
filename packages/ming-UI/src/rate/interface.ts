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
}

export interface rateItemProps extends Omit<rateProps, 'modelValue' | 'fillColor' | 'iconComponent' | 'clearable' | 'lowThreshold' | 'highThreshold' | 'thresholdArr' | 'scoreAccuracy' > {
  id: number
  fillColor?: string
  iconComponent?: Component
  score?: number
}
