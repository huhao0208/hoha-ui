<template>
  <div :class="navBarClasses">
    <!-- 占位符（fixed 模式下占位） -->
    <div
      v-if="fixed && placeholder"
      class="ho-navbar__placeholder"
      :style="placeholderStyle"
    />
    
    <!-- 导航栏主体 -->
    <div class="ho-navbar__inner" :style="innerStyle">
      <!-- 左侧区域 -->
      <div class="ho-navbar__left" @click="handleClickLeft">
        <slot name="left">
          <span v-if="leftArrow" class="ho-navbar__arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </span>
          <span v-if="leftText" class="ho-navbar__text">{{ leftText }}</span>
        </slot>
      </div>
      
      <!-- 标题区域 -->
      <div class="ho-navbar__title">
        <slot name="title">
          <span class="ho-navbar__title-text">{{ title }}</span>
        </slot>
      </div>
      
      <!-- 右侧区域 -->
      <div class="ho-navbar__right" @click="handleClickRight">
        <slot name="right">
          <span v-if="rightText" class="ho-navbar__text">{{ rightText }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType, CSSProperties } from 'vue'

export default defineComponent({
  name: 'HoNavBar',
  props: {
    title: { type: String, default: '' },
    leftText: { type: String, default: '' },
    rightText: { type: String, default: '' },
    leftArrow: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
    placeholder: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    safeAreaInsetTop: { type: Boolean, default: true },
    height: { type: [Number, String], default: 46 },
    background: { type: String, default: '' },
    textColor: { type: String, default: '' },
    zIndex: { type: [Number, String], default: 100 }
  },
  emits: ['click-left', 'click-right'],
  setup(props, { emit }) {
    const navBarClasses = computed(() => [
      'ho-navbar',
      { 'ho-navbar--fixed': props.fixed, 'ho-navbar--border': props.border }
    ])

    const heightValue = computed(() => 
      typeof props.height === 'number' ? `${props.height}px` : props.height
    )

    const innerStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {
        height: heightValue.value,
        zIndex: Number(props.zIndex)
      }
      if (props.background) style.background = props.background
      if (props.textColor) style.color = props.textColor
      if (props.fixed && props.safeAreaInsetTop) {
        style.paddingTop = 'var(--hoho-safe-area-top)'
      }
      return style
    })

    const placeholderStyle = computed<CSSProperties>(() => ({
      height: heightValue.value,
      paddingTop: props.safeAreaInsetTop ? 'var(--hoho-safe-area-top)' : undefined
    }))

    const handleClickLeft = (e: MouseEvent) => emit('click-left', e)
    const handleClickRight = (e: MouseEvent) => emit('click-right', e)

    return { navBarClasses, innerStyle, placeholderStyle, handleClickLeft, handleClickRight }
  }
})
</script>

<style lang="less">
.ho-navbar {
  position: relative;
  width: 100%;
  
  &--fixed {
    .ho-navbar__inner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
  }
  
  &--border {
    .ho-navbar__inner {
      border-bottom: 1px solid var(--hoho-border-secondary, #e5e7eb);
    }
  }
  
  &__placeholder {
    width: 100%;
    box-sizing: content-box;
  }
  
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: var(--hoho-bg-primary, #ffffff);
    color: var(--hoho-text-primary, #111827);
    box-sizing: content-box;
    /* 使用设计规范高度 */
    height: var(--hoho-navbar-height, 46px);
  }
  
  &__left,
  &__right {
    display: flex;
    align-items: center;
    min-width: var(--hoho-touch-target, 44px);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    
    &:active { opacity: 0.7; }
  }
  
  &__left {
    justify-content: flex-start;
    padding-left: var(--hoho-spacing-sm, 10px);
  }
  
  &__right {
    justify-content: flex-end;
    padding-right: var(--hoho-spacing-sm, 10px);
  }
  
  &__arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--hoho-font-xl, 24px);
    height: var(--hoho-font-xl, 24px);
    margin-right: var(--hoho-spacing-xs, 4px);
    
    svg {
      width: var(--hoho-font-lg, 20px);
      height: var(--hoho-font-lg, 20px);
    }
  }
  
  &__text {
    font-size: var(--hoho-font-md, 14px);
    line-height: var(--hoho-line-height-normal, 1.4);
    white-space: nowrap;
  }
  
  &__title {
    flex: 1;
    text-align: center;
    overflow: hidden;
    padding: 0 var(--hoho-spacing-xs, 8px);
  }
  
  &__title-text {
    display: block;
    font-size: var(--hoho-font-lg, 17px);
    font-weight: var(--hoho-font-semibold, 600);
    line-height: var(--hoho-line-height-normal, 1.4);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* 暗色模式 */
html.dark {
  .ho-navbar__inner {
    background: var(--hoho-bg-primary, #1f2937);
    color: var(--hoho-text-primary, #f9fafb);
  }
  
  .ho-navbar--border .ho-navbar__inner {
    border-bottom-color: var(--hoho-border-primary, #374151);
  }
}

/* 移动端适配 */
@media screen and (max-width: 767px) {
  .ho-navbar {
    &__left, &__right {
      min-width: 48px;
      min-height: 48px;
      padding: 0 var(--hoho-spacing-sm, 12px);
    }
    
    &__arrow {
      width: 28px;
      height: 28px;
      svg { width: 24px; height: 24px; }
    }
  }
}
</style>
