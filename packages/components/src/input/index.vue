<template>
  <div
    class="ho-input"
    :class="inputClasses"
  >
    <span v-if="$slots.prefix" class="ho-input__prefix">
      <slot name="prefix" />
    </span>
    <input
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="ho-input__inner"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <span v-if="$slots.suffix" class="ho-input__suffix">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import type { PropType } from 'vue'

type InputSize = 'small' | 'medium' | 'large'

export default defineComponent({
  name: 'HoInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<InputSize>,
      default: 'medium'
    }
  },
  emits: ['update:modelValue', 'input', 'focus', 'blur'],
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement>()
    const focused = ref(false)

    const inputClasses = computed(() => [
      `ho-input--${props.size}`,
      {
        'ho-input--disabled': props.disabled,
        'ho-input--focused': focused.value
      }
    ])

    const handleInput = (e: Event) => {
      const value = (e.target as HTMLInputElement).value
      emit('update:modelValue', value)
      emit('input', value)
    }

    const handleFocus = (e: FocusEvent) => {
      focused.value = true
      emit('focus', e)
    }

    const handleBlur = (e: FocusEvent) => {
      focused.value = false
      emit('blur', e)
    }

    const focus = () => inputRef.value?.focus()
    const blur = () => inputRef.value?.blur()

    return {
      inputRef,
      focused,
      inputClasses,
      handleInput,
      handleFocus,
      handleBlur,
      focus,
      blur
    }
  }
})
</script>

<style lang="less">
.ho-input {
  display: inline-flex;
  align-items: center;
  background: var(--hoho-bg-primary, #fff);
  border: 1px solid var(--hoho-border-primary, #d1d5db);
  border-radius: var(--hoho-radius-md, 6px);
  transition: var(--hoho-duration-fast, 0.15s) var(--hoho-ease, ease);
  
  /* 最小点击区域 */
  min-height: var(--hoho-touch-target, 44px);

  &:hover:not(.ho-input--disabled) {
    border-color: var(--hoho-text-tertiary, #6b7280);
  }

  &--focused {
    border-color: var(--hoho-color-primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--hoho-color-primary) 10%, transparent);
  }

  &--disabled {
    background: var(--hoho-bg-tertiary, #f3f4f6);
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* 尺寸 - 使用设计规范 */
  &--small {
    padding: var(--hoho-spacing-xs, 5px) var(--hoho-spacing-sm, 10px);
    min-height: 32px;
    .ho-input__inner {
      font-size: var(--hoho-font-sm, 13px);
    }
  }

  &--medium {
    padding: var(--hoho-spacing-sm, 10px) var(--hoho-spacing-md, 15px);
    min-height: var(--hoho-touch-target, 44px);
    .ho-input__inner {
      font-size: var(--hoho-font-md, 15px);
    }
  }

  &--large {
    padding: var(--hoho-spacing-md, 15px) var(--hoho-spacing-lg, 20px);
    min-height: 52px;
    .ho-input__inner {
      font-size: var(--hoho-font-lg, 17px);
    }
  }

  &__inner {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--hoho-text-primary, #111827);
    width: 100%;
    font-family: inherit;
    font-weight: var(--hoho-font-normal, 400);

    &::placeholder {
      color: var(--hoho-text-placeholder, #9ca3af);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--hoho-text-tertiary, #6b7280);
    }
  }

  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    color: var(--hoho-text-tertiary, #6b7280);
  }

  &__prefix {
    margin-right: var(--hoho-spacing-sm, 10px);
  }

  &__suffix {
    margin-left: var(--hoho-spacing-sm, 10px);
  }
}

/* 暗色模式 */
html.dark .ho-input {
  background: var(--hoho-bg-secondary, #111827);
  border-color: var(--hoho-border-primary, #374151);
  
  &:hover:not(.ho-input--disabled) {
    border-color: var(--hoho-border-secondary, #4b5563);
  }
  
  &--disabled {
    background: var(--hoho-bg-tertiary, #374151);
  }
}

/* 移动端适配 */
@media screen and (max-width: 767px) {
  .ho-input {
    min-height: 48px;
    
    &--small {
      min-height: 36px;
    }
    
    &--medium {
      min-height: 48px;
    }
    
    &--large {
      min-height: 56px;
    }
  }
}
</style>
