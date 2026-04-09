<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  code: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue'
})

const showCode = ref(false)
const copied = ref(false)
const isDark = ref(false)

// 获取当前主题
onMounted(() => {
  const html = document.documentElement
  isDark.value = html.classList.contains('dark')
  
  // 创建 MutationObserver 监听 class 变化
  const observer = new MutationObserver(() => {
    isDark.value = html.classList.contains('dark')
  })
  
  observer.observe(html, {
    attributes: true,
    attributeFilter: ['class']
  })
})

// 切换代码显示
const toggleCode = () => {
  showCode.value = !showCode.value
}

// 复制代码
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="demo-block" :class="{ 'demo-block--dark': isDark }">
    <!-- 预览区域 -->
    <div class="demo-block__preview">
      <slot></slot>
    </div>
    
    <!-- 操作按钮 -->
    <div class="demo-block__actions">
      <button 
        class="demo-block__action-btn" 
        @click="toggleCode"
      >
        <svg 
          v-if="showCode" 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <span>{{ showCode ? '隐藏代码' : '显示代码' }}</span>
      </button>
      
      <button 
        class="demo-block__action-btn" 
        @click="copyCode"
      >
        <svg 
          v-if="copied" 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>{{ copied ? '已复制!' : '复制代码' }}</span>
      </button>
    </div>
    
    <!-- 代码区域 -->
    <Transition name="slide-fade">
      <div v-show="showCode" class="demo-block__code">
        <pre class="demo-block__code-content"><code :class="`language-${language}`">{{ code }}</code></pre>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.demo-block {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  transition: border-color 0.3s, background-color 0.3s;
}

.demo-block:hover {
  border-color: var(--vp-c-brand-light);
}

/* 预览区域 */
.demo-block__preview {
  padding: 24px;
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider-light);
}

/* 操作按钮区域 */
.demo-block__actions {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.demo-block__action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
}

.demo-block__action-btn:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand-light);
  background-color: var(--vp-c-bg-soft);
}

.demo-block__action-btn:active {
  transform: scale(0.98);
}

/* 代码区域 */
.demo-block__code {
  background-color: var(--vp-code-block-bg);
  overflow: hidden;
}

.demo-block__code-content {
  overflow-x: auto;
  padding: 16px;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  background: transparent !important;
}

.demo-block__code-content code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
  background: transparent !important;
}

/* 过渡动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
  max-height: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 1000px;
}
</style>
