import { ExtractPropTypes } from 'vue'

export const selectProps = {
  list: {
    type: Array,
    default: () => []
  }
} as const

export type SelectProps = ExtractPropTypes<typeof selectProps>;
