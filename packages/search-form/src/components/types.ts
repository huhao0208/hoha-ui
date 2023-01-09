import { ExtractPropTypes, PropType } from 'vue'

interface ChildrenItem {
  label:string|number;
  value:string|number|boolean
}

type ItemType = 'input'| 'select'|'switch'|'radio-group'

export const searchFormItemProps = {
  modelValue: {
    type: [String, Object, Array, Number, Boolean],
    default: null
  },
  children: {
    type: Array as PropType<ChildrenItem[]>,
    required: false,
    default: () => []
  },
  key: {
    type: [Number, String]
  },
  type: {
    type: String as PropType<ItemType>,
    required: true,
    default: 'input'
  },
  attrs: {
    type: Object,
    default: () => ({})
  }

} as const

export type SearchFormItemProps = ExtractPropTypes<typeof searchFormItemProps>
