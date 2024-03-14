export interface InputProps {
  modelValue?: string
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
  originInputProps?: ['autocomplete']
}

// 透传Attributes数组,可控制哪些input原生属性可以使用。
export const originInputProps = ['autocomplete']
