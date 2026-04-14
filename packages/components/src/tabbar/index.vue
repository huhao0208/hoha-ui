<template>
  <div :class="tabBarClasses">
    <slot />
  </div>
  <div
    v-if="fixed && placeholder"
    class="ho-tabbar__placeholder"
    :style="placeholderStyle"
  />
</template>

<script lang="ts">
import { defineComponent, computed, provide, type Ref } from 'vue'

export const TABBAR_KEY = Symbol('tabbar')

export interface TabBarProvider {
  active: Ref<number | string>
  setActive: (value: number | string) => void
  getNextIndex: () => number
}

export default defineComponent({
  name: 'HoTabBar',
  props: {
    modelValue: { type: [Number, String], default: 0 },
    fixed: { type: Boolean, default: false },
    placeholder: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    safeAreaInsetBottom: { type: Boolean, default: true },
    zIndex: { type: [Number, String], default: 100 },
    activeColor: { type: String, default: '' },
    inactiveColor: { type: String, default: '' }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const active = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })

    const setActive = (value: number | string) => {
      if (value !== active.value) {
        active.value = value
        emit('change', value)
      }
    }

    // 索引计数器
    let itemIndex = 0
    const getNextIndex = () => itemIndex++

    provide<TabBarProvider>(TABBAR_KEY, { active, setActive, getNextIndex })

    const tabBarClasses = computed(() => [
      'ho-tabbar',
      {
        'ho-tabbar--fixed': props.fixed,
        'ho-tabbar--border': props.border,
        'ho-tabbar--safe-area': props.safeAreaInsetBottom
      }
    ])

    const placeholderStyle = computed(() => ({
      height: props.safeAreaInsetBottom
        ? 'calc(var(--hoho-tabbar-height, 50px) + var(--hoho-safe-area-bottom))'
        : 'var(--hoho-tabbar-height, 50px)'
    }))

    return { tabBarClasses, placeholderStyle }
  }
})
</script>

<style lang="less">
.ho-tabbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--hoho-tabbar-height, 50px);
  background: var(--hoho-bg-primary, #ffffff);
  box-sizing: border-box;

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--hoho-z-fixed, 100);
  }

  &--border {
    border-top: 1px solid var(--hoho-border-secondary, #e5e7eb);
  }

  &--safe-area {
    padding-bottom: var(--hoho-safe-area-bottom);
  }

  &__placeholder {
    flex-shrink: 0;
    pointer-events: none;
  }
}

/* 暗色模式 */
html.dark .ho-tabbar {
  background: var(--hoho-bg-primary, #1f2937);
}

html.dark .ho-tabbar--border {
  border-top-color: var(--hoho-border-primary, #374151);
}

/* 移动端适配 */
@media screen and (max-width: 767px) {
  .ho-tabbar {
    height: 50px;
  }
}
</style>
