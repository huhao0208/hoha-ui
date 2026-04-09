export const VERSION = '0.0.1'

export const COMPONENT_NAME_PREFIX = 'Ho'

export type Size = 'small' | 'medium' | 'large'

export type Type = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

export const sizeMap: Record<Size, string> = {
  small: 'sm',
  medium: 'md',
  large: 'lg'
}
