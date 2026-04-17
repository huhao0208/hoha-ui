<template>
  <div
    :class="cellClasses"
    @click="handleClick"
  >
    <div
      v-if="icon || $slots.icon"
      class="ho-cell__icon"
    >
      <slot name="icon">
        <HoIcon
          :name="icon"
          :size="iconSize"
        />
      </slot>
    </div>

    <div class="ho-cell__content">
      <div
        v-if="title || $slots.title"
        class="ho-cell__title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="label || $slots.label"
        class="ho-cell__label"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </div>
    </div>

    <div
      v-if="hasValue"
      class="ho-cell__value"
    >
      <slot name="value">
        {{ value }}
      </slot>
    </div>

    <div
      v-if="isLink || arrowDirection"
      class="ho-cell__arrow"
    >
      <HoIcon
        :name="arrowIcon"
        :size="14"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import HoIcon from '../icon/index.vue'

type CellArrowDirection = 'left' | 'right' | 'up' | 'down'

export default defineComponent({
  name: 'HoCell',
  components: { HoIcon },
  props: {
    title: { type: String, default: '' },
    label: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    icon: { type: String, default: '' },
    iconSize: { type: [String, Number], default: 18 },
    isLink: { type: Boolean, default: false },
    arrowDirection: { type: String as PropType<CellArrowDirection>, default: '' },
    disabled: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    clickable: { type: Boolean, default: null },
    titleWidth: { type: [String, Number], default: '' },
    titleStyle: { type: Object, default: () => ({}) }
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const cellClasses = computed(() => [
      'ho-cell',
      {
        'ho-cell--clickable': props.clickable !== null ? props.clickable : (props.isLink || !!props.arrowDirection),
        'ho-cell--disabled': props.disabled,
        'ho-cell--border': props.border,
        'ho-cell--link': props.isLink || props.arrowDirection
      }
    ])

    const hasValue = computed(() => props.value !== '' || slots.value)

    const arrowIcon = computed(() => {
      if (!props.arrowDirection && !props.isLink) return ''
      const direction = props.arrowDirection || 'right'
      const iconMap = { left: 'mdi:arrow-left', right: 'mdi:arrow-right', up: 'mdi:arrow-up', down: 'mdi:arrow-down' }
      return iconMap[direction] || 'mdi:arrow-right'
    })

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled) emit('click', e)
    }

    return { cellClasses, hasValue, arrowIcon, handleClick }
  }
})
</script>

<style lang="less">
.ho-cell {
  display: flex;
  align-items: center;
  padding: var(--hoho-spacing-3, 0.75rem) var(--hoho-spacing-4, 1rem);
  font-size: var(--hoho-font-md, 0.875rem);
  line-height: var(--hoho-line-height-normal, 1.5);
  background: var(--hoho-bg-primary, #fff);
  position: relative;
  
  &--clickable {
    cursor: pointer;
    
    &:active {
      background: var(--hoho-bg-secondary, #f9fafb);
    }
  }
  
  &--disabled {
    opacity: var(--hoho-opacity-disabled, 0.5);
    cursor: not-allowed;
  }
  
  &--border::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: var(--hoho-spacing-4, 1rem);
    right: 0;
    height: 1px;
    background: var(--hoho-divider, #e5e7eb);
    transform: scaleY(0.5);
  }
  
  &__icon {
    flex-shrink: 0;
    margin-right: var(--hoho-spacing-3, 0.75rem);
    color: var(--hoho-text-tertiary, #6b7280);
  }
  
  &__content {
    flex: 1;
    min-width: 0;
  }
  
  &__title {
    color: var(--hoho-text-primary, #111827);
    font-size: var(--hoho-font-md, 0.875rem);
    line-height: var(--hoho-line-height-normal, 1.5);
  }
  
  &__label {
    margin-top: var(--hoho-spacing-1, 0.25rem);
    color: var(--hoho-text-tertiary, #6b7280);
    font-size: var(--hoho-font-sm, 0.75rem);
    line-height: var(--hoho-line-height-normal, 1.5);
  }
  
  &__value {
    flex-shrink: 0;
    color: var(--hoho-text-secondary, #4b5563);
    font-size: var(--hoho-font-md, 0.875rem);
    margin-right: var(--hoho-spacing-2, 0.5rem);
  }
  
  &__arrow {
    flex-shrink: 0;
    color: var(--hoho-text-placeholder, #9ca3af);
    margin-left: var(--hoho-spacing-1, 0.25rem);
  }
}

/* 暗色模式 */
html.dark .ho-cell {
  background: var(--hoho-bg-primary, #1f2937);
  
  &--clickable:active {
    background: var(--hoho-bg-tertiary, #374151);
  }
  
  &--border::after {
    background: var(--hoho-divider, #374151);
  }
}

/* 移动端适配 */
@media screen and (max-width: 47.9375rem) {
  .ho-cell {
    padding: var(--hoho-spacing-3, 0.75rem) var(--hoho-spacing-3, 0.75rem);
    min-height: var(--hoho-touch-target, 2.75rem);
  }
}
</style>
