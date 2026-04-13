<template>
  <i
    class="ho-icon"
    :class="iconClasses"
    :style="iconStyle"
  >
    <svg
      v-if="icon"
      aria-hidden="true"
    >
      <use :xlink:href="`#${icon}`" />
    </svg>
    <slot v-else />
  </i>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'HoIcon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: '1em'
    },
    color: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const iconClasses = computed(() => ({
      'ho-icon--custom': !!props.icon
    }))

    const iconStyle = computed(() => ({
      fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
      color: props.color
    }))

    return {
      iconClasses,
      iconStyle
    }
  }
})
</script>

<style lang="less">
.ho-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
