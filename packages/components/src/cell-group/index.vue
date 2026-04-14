<template>
  <div :class="cellGroupClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'HoCellGroup',
  props: {
    border: { type: Boolean, default: true },
    inset: { type: Boolean, default: false },
    title: { type: String, default: '' }
  },
  setup(props) {
    const cellGroupClasses = computed(() => [
      'ho-cell-group',
      { 'ho-cell-group--border': props.border, 'ho-cell-group--inset': props.inset }
    ])
    return { cellGroupClasses }
  }
})
</script>

<style lang="less">
.ho-cell-group {
  background: var(--hoho-bg-primary, #fff);
  
  &--border {
    border-radius: var(--hoho-radius-lg, 8px);
    overflow: hidden;
  }
  
  &--inset {
    margin: var(--hoho-spacing-3, 12px);
    border-radius: var(--hoho-radius-lg, 8px);
    overflow: hidden;
  }
}

/* 暗色模式 */
html.dark .ho-cell-group {
  background: var(--hoho-bg-primary, #1f2937);
}
</style>
