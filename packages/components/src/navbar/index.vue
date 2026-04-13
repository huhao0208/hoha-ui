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
          <!-- 返回箭头 -->
          <span v-if="leftArrow" class="ho-navbar__arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </span>
          <!-- 左侧文字 -->
          <span v-if="leftText" class="ho-navbar__text">{{ leftText }}</span>
        </slot>
      </div>
      
      <!-- 标题区域（居中） -->
      <div class="ho-navbar__title">
        <slot name="title">
          <span class="ho-navbar__title-text">{{ title }}</span>
        </slot>
      </div>
      
      <!-- 右侧区域 -->
      <div class="ho-navbar__right" @click="handleClickRight">
        <slot name="right">
          <!-- 右侧文字 -->
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
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 左侧文字
    leftText: {
      type: String,
      default: ''
    },
    // 右侧文字
    rightText: {
      type: String,
      default: ''
    },
    // 是否显示左侧箭头
    leftArrow: {
      type: Boolean,
      default: false
    },
    // 是否固定在顶部
    fixed: {
      type: Boolean,
      default: false
    },
    // 固定时是否生成占位元素
    placeholder: {
      type: Boolean,
      default: false
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      default: true
    },
    // 是否显示安全区域
    safeAreaInsetTop: {
      type: Boolean,
      default: true
    },
    // 导航栏高度
    height: {
      type: [Number, String],
      default: 46
    },
    // 背景色
    background: {
      type: String,
      default: ''
    },
    // 文字颜色
    textColor: {
      type: String,
      default: ''
    },
    // z-index
    zIndex: {
      type: [Number, String],
      default: 100
    }
  },
  emits: ['click-left', 'click-right'],
  setup(props, { emit }) {
    const navBarClasses = computed(() => [
      'ho-navbar',
      {
        'ho-navbar--fixed': props.fixed,
        'ho-navbar--border': props.border
      }
    ])

    const heightValue = computed(() => {
      if (typeof props.height === 'number') {
        return `${props.height}px`
      }
      return props.height
    })

    const innerStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {
        height: heightValue.value,
        zIndex: Number(props.zIndex)
      }
      
      if (props.background) {
        style.background = props.background
      }
      
      if (props.textColor) {
        style.color = props.textColor
      }
      
      if (props.fixed && props.safeAreaInsetTop) {
        style.paddingTop = 'var(--hoho-safe-area-top)'
      }
      
      return style
    })

    const placeholderStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {
        height: heightValue.value
      }
      
      if (props.safeAreaInsetTop) {
        style.paddingTop = 'var(--hoho-safe-area-top)'
      }
      
      return style
    })

    const handleClickLeft = (e: MouseEvent) => {
      emit('click-left', e)
    }

    const handleClickRight = (e: MouseEvent) => {
      emit('click-right', e)
    }

    return {
      navBarClasses,
      innerStyle,
      placeholderStyle,
      handleClickLeft,
      handleClickRight
    }
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
  }
  
  &__left,
  &__right {
    display: flex;
    align-items: center;
    min-width: 60px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    
    &:active {
      opacity: 0.7;
    }
  }
  
  &__left {
    justify-content: flex-start;
    padding-left: 12px;
  }
  
  &__right {
    justify-content: flex-end;
    padding-right: 12px;
  }
  
  &__arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: 4px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
  
  &__text {
    font-size: 14px;
    line-height: 1.4;
    white-space: nowrap;
  }
  
  &__title {
    flex: 1;
    text-align: center;
    overflow: hidden;
    padding: 0 8px;
  }
  
  &__title-text {
    display: block;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .ho-navbar {
    &__left,
    &__right {
      min-width: 44px;
      min-height: 44px;
      padding: 0 12px;
    }
    
    &__left {
      padding-left: 8px;
    }
    
    &__right {
      padding-right: 8px;
    }
    
    &__arrow {
      width: 28px;
      height: 28px;
      
      svg {
        width: 24px;
        height: 24px;
      }
    }
    
    &__text {
      font-size: 15px;
    }
    
    &__title-text {
      font-size: 17px;
      font-weight: 600;
    }
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
  
  .ho-navbar__left:active,
  .ho-navbar__right:active {
    opacity: 0.8;
  }
}

/* 小屏幕适配 (<=375px) */
@media screen and (max-width: 375px) {
  .ho-navbar {
    &__left,
    &__right {
      min-width: 40px;
      padding: 0 8px;
    }
    
    &__title-text {
      font-size: 16px;
    }
    
    &__text {
      font-size: 14px;
    }
  }
}
</style>
