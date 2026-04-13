<template>
  <Icon
    :icon="name"
    :width="computedSize"
    :height="computedSize"
    :color="color"
    :rotate="rotate"
    :flip="flip"
    :inline="inline"
    :class="iconClasses"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { PropType } from 'vue'

type IconSize = 'small' | 'medium' | 'large' | number

export default defineComponent({
  name: 'HoIcon',
  components: {
    Icon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number] as PropType<IconSize>,
      default: 'medium'
    },
    color: {
      type: String,
      default: ''
    },
    rotate: {
      type: [Number, String],
      default: undefined
    },
    flip: {
      type: String as PropType<'horizontal' | 'vertical' | 'both'>,
      default: undefined
    },
    inline: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const computedSize = computed(() => {
      if (typeof props.size === 'number') {
        return props.size
      }
      const sizeMap: Record<string, string> = {
        small: '16',
        medium: '24',
        large: '32'
      }
      return sizeMap[props.size] || '24'
    })

    const iconClasses = computed(() => [
      'ho-icon',
      {
        'ho-icon--clickable': props.clickable
      }
    ])

    const handleClick = (e: MouseEvent) => {
      if (props.clickable) {
        emit('click', e)
      }
    }

    return {
      computedSize,
      iconClasses,
      handleClick
    }
  }
})
</script>

<style lang="less">
.ho-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  &--clickable {
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;

    &:hover {
      transform: scale(1.1);
      opacity: 0.8;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
