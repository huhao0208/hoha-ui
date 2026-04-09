<template>
  <button
    :class="['hoha-button', `hoha-button--${type}`, `hoha-button--${size}`, { 'is-disabled': disabled, 'is-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="hoha-button__loading">
      <svg class="hoha-button__spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    </span>
    <span class="hoha-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'HohaButton',
  props: {
    type: {
      type: String as PropType<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>,
      default: 'primary'
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
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
    const handleClick = (event: MouseEvent) => {
      if (!props.disabled && !props.loading) {
        emit('click', event)
      }
    }

    return { handleClick }
  }
})
</script>

<style lang="less" scoped>
.hoha-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &--primary {
    background-color: #409eff;
    color: #fff;
    border-color: #409eff;

    &:hover:not(.is-disabled) {
      background-color: #66b1ff;
      border-color: #66b1ff;
    }

    &:active:not(.is-disabled) {
      background-color: #3a8ee6;
      border-color: #3a8ee6;
    }
  }

  &--secondary {
    background-color: #fff;
    color: #606266;
    border-color: #dcdfe6;

    &:hover:not(.is-disabled) {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }

  &--success {
    background-color: #67c23a;
    color: #fff;
    border-color: #67c23a;

    &:hover:not(.is-disabled) {
      background-color: #85ce61;
      border-color: #85ce61;
    }
  }

  &--warning {
    background-color: #e6a23c;
    color: #fff;
    border-color: #e6a23c;

    &:hover:not(.is-disabled) {
      background-color: #ebb563;
      border-color: #ebb563;
    }
  }

  &--danger {
    background-color: #f56c6c;
    color: #fff;
    border-color: #f56c6c;

    &:hover:not(.is-disabled) {
      background-color: #f78989;
      border-color: #f78989;
    }
  }

  &--info {
    background-color: #909399;
    color: #fff;
    border-color: #909399;

    &:hover:not(.is-disabled) {
      background-color: #a6a9ad;
      border-color: #a6a9ad;
    }
  }

  &--small {
    padding: 6px 12px;
    font-size: 12px;
  }

  &--medium {
    padding: 8px 16px;
    font-size: 14px;
  }

  &--large {
    padding: 10px 20px;
    font-size: 16px;
  }

  &.is-disabled,
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.is-loading {
    position: relative;
    pointer-events: none;
  }

  &__loading {
    display: inline-flex;
    margin-right: 6px;
  }

  &__spinner {
    width: 14px;
    height: 14px;
    animation: rotate 2s linear infinite;

    .path {
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
}
</style>
