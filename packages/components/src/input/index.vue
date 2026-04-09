<template>
  <div class="ho-input" :class="inputClasses">
    <span v-if="$slots.prefix" class="ho-input__prefix">
      <slot name="prefix"></slot>
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
    />
    <span v-if="$slots.suffix" class="ho-input__suffix">
      <slot name="suffix"></slot>
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
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover:not(.ho-input--disabled) {
    border-color: #9ca3af;
  }

  &--focused {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &--disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }

  &--small {
    padding: 4px 8px;
    .ho-input__inner {
      font-size: 12px;
    }
  }

  &--medium {
    padding: 8px 12px;
    .ho-input__inner {
      font-size: 14px;
    }
  }

  &--large {
    padding: 12px 16px;
    .ho-input__inner {
      font-size: 16px;
    }
  }

  &__inner {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: #111827;
    width: 100%;

    &::placeholder {
      color: #9ca3af;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    color: #6b7280;
  }

  &__prefix {
    margin-right: 8px;
  }

  &__suffix {
    margin-left: 8px;
  }
}
</style>
