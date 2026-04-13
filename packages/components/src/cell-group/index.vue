<template>
  <div :class="cellGroupClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'HoCellGroup',
  props: {
    // 是否显示外边框
    border: {
      type: Boolean,
      default: true
    },
    // 是否显示内边框（子项之间的分隔线）
    inset: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const cellGroupClasses = computed(() => [
      'ho-cell-group',
      {
        'ho-cell-group--border': props.border,
        'ho-cell-group--inset': props.inset
      }
    ])

    return {
      cellGroupClasses
    }
  }
})
</script>
