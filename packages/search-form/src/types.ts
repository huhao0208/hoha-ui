import { ExtractPropTypes, PropType } from 'vue'

export interface attrsItem {
  [name: string]: any;
}
export interface ColumnsItem {
  type: 'input'| 'select'
  key:string|number
  label: string
  children?: any[]
  attrs?: attrsItem
}

export interface Icons {
  search: any
  reset: any
}
export const searchFormProps = {
  icons: {
    type: Object as PropType<Icons>,
    default: () => ({ search: '', reset: '' })
  },
  searchParam: {
    type: Object as PropType<attrsItem>,
    default: () => ({})
  },
  columns: {
    type: Array as PropType<ColumnsItem[]>,
    required: true,
    default: () => []
  },
  loading: Boolean
} as const

export type SearchFormProps = ExtractPropTypes<typeof searchFormProps>
