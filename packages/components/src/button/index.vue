<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="ho-button__loading"
    />
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
type ButtonSize = 'small' | 'medium' | 'large'

export default defineComponent({
  name: 'HoButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'primary'
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const buttonClasses = computed(() => [
      'ho-button',
      `ho-button--${props.type}`,
      `ho-button--${props.size}`,
      {
        'ho-button--disabled': props.disabled,
        'ho-button--loading': props.loading
      }
    ])

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled && !props.loading) {
        emit('click', e)
      }
    }

    return {
      buttonClasses,
      handleClick
    }
  }
})
</script>

<style lang="less">
.ho-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: 0.25s ease;
  font-family: inherit;
  /* 基于 375px 设计稿：44px / 16 = 2.75rem */
  min-height: 2.75rem;
  min-width: 2.75rem;

  &--small {
    /* 32px / 16 = 2rem */
    padding: 0.3125rem 0.625rem; /* 5px 10px */
    font-size: 0.8125rem; /* 13px */
    border-radius: 0.25rem; /* 4px */
    min-height: 2rem;
    min-width: 2rem;
  }

  &--medium {
    /* 44px / 16 = 2.75rem */
    padding: 0.625rem 0.9375rem; /* 10px 15px */
    font-size: 0.9375rem; /* 15px */
    border-radius: 0.375rem; /* 6px */
    min-height: 2.75rem;
  }

  &--large {
    /* 52px / 16 = 3.25rem */
    padding: 0.9375rem 1.25rem; /* 15px 20px */
    font-size: 1.0625rem; /* 17px */
    border-radius: 0.5rem; /* 8px */
    min-height: 3.25rem;
  }

  &--primary {
    background: var(--hoho-color-primary, #3b82f6);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-primary, #3b82f6) 85%, black);
    }
  }

  &--secondary {
    background: var(--hoho-color-secondary, #6b7280);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-secondary, #6b7280) 85%, black);
    }
  }

  &--success {
    background: var(--hoho-color-success, #10b981);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-success, #10b981) 85%, black);
    }
  }

  &--warning {
    background: var(--hoho-color-warning, #f59e0b);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-warning, #f59e0b) 85%, black);
    }
  }

  &--danger {
    background: var(--hoho-color-danger, #ef4444);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-danger, #ef4444) 85%, black);
    }
  }

  &--info {
    background: var(--hoho-color-info, #06b6d4);
    color: white;
    &:hover:not(.ho-button--disabled) {
      background: color-mix(in srgb, var(--hoho-color-info, #06b6d4) 85%, black);
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--loading {
    cursor: wait;
  }

  &__loading {
    width: 1em;
    height: 1em;
    border: 0.125rem solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ho-button-loading 0.8s linear infinite;
    margin-right: 0.375rem; /* 6px */
  }
}

@keyframes ho-button-loading {
  to { transform: rotate(360deg); }
}
</style>
