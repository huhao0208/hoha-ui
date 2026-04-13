<template>
  <div
    class="ho-tab"
    :class="{
      'ho-tab--active': active,
      'ho-tab--disabled': disabled
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'HoTab',
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: [String, Number] as PropType<string | number>,
      default: undefined
    },
    badge: {
      type: [Number, String] as PropType<number | string>,
      default: undefined
    },
    dot: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const tabsContext = inject<any>('tabs')
    
    const active = computed(() => {
      if (!tabsContext) return false
      return tabsContext.activeIndex.value === props.name
    })
    
    return {
      active
    }
  }
})
</script>
