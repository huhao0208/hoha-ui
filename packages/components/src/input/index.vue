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
  border-radius: var(--hoho-radius-md, 0.375rem);
  transition: var(--hoho-duration-fast, 0.15s) var(--hoho-ease, ease);
  
  min-height: 2.75rem;

  &:hover:not(.ho-input--disabled) {
    border-color: var(--hoho-text-tertiary, #6b7280);
  }

  &--focused {
    border-color: var(--hoho-color-primary);
    box-shadow: 0 0 0 0.1875rem color-mix(in srgb, var(--hoho-color-primary) 10%, transparent);
  }

  &--disabled {
    background: var(--hoho-bg-tertiary, #f3f4f6);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--small {
    padding: 0.3125rem 0.625rem;
    min-height: 2rem;
    .ho-input__inner {
      font-size: 0.8125rem;
    }
  }

  &--medium {
    padding: 0.625rem 0.9375rem;
    min-height: 2.75rem;
    .ho-input__inner {
      font-size: 0.9375rem;
    }
  }

  &--large {
    padding: 0.9375rem 1.25rem;
    min-height: 3.25rem;
    .ho-input__inner {
      font-size: 1.0625rem;
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
    font-weight: 400;

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
    margin-right: 0.625rem;
  }

  &__suffix {
    margin-left: 0.625rem;
  }
}

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

@media screen and (max-width: 47.9375rem) {
  .ho-input {
    min-height: 3rem;
    
    &--small {
      min-height: 2.25rem;
    }
    
    &--medium {
      min-height: 3rem;
    }
    
    &--large {
      min-height: 3.5rem;
    }
  }
}
</style>
