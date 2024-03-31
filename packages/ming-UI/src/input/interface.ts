export interface InputProps {
  type?: 'text' | 'number'
  modelValue?: string | number
  modelModifiers?: { default: () => (object) }
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
  inputStyle?: object | null

}

// 透传Attributes数组,可控制哪些input原生属性可以使用。
export const originInputProps = ['autocomplete', 'max', 'min', 'maxlength', 'minlength']
