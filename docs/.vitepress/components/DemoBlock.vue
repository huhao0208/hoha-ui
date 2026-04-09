<template>
  <div class="demo-block">
    <!-- 预览区域 -->
    <div class="demo-block__preview">
      <slot />
    </div>
    
    <!-- 操作栏 -->
    <div class="demo-block__actions">
      <button class="demo-block__btn" @click="toggleCode">
        <span v-if="!showCode">显示代码</span>
        <span v-else>隐藏代码</span>
      </button>
      <button class="demo-block__btn" @click="copyCode">
        {{ copied ? '已复制!' : '复制代码' }}
      </button>
    </div>
    
    <!-- 代码区域 -->
    <Transition name="slide">
      <div v-show="showCode" class="demo-block__code">
        <pre><code v-html="highlightedCode"></code></pre>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { shiki } from '@shikijs/markdown-it'

const props = defineProps<{
  code?: string
}>()

const showCode = ref(false)
const copied = ref(false)

const highlightedCode = computed(() => {
  if (!props.code) return ''
  // 简单的代码高亮（VitePress 会处理）
  return `<code class="language-vue">${escapeHtml(props.code)}</code>`
})

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function toggleCode() {
  showCode.value = !showCode.value
}

async function copyCode() {
  if (!props.code) return
  
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style scoped>
.demo-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.demo-block__preview {
  padding: 24px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-block__actions {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-block__btn {
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.demo-block__btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.demo-block__code {
  background: var(--vp-code-block-bg);
  overflow-x: auto;
}

.demo-block__code pre {
  margin: 0;
  padding: 16px;
}

.demo-block__code code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
}

/* 过渡动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

/* 暗色模式 */
html.dark .demo-block__preview {
  background: var(--vp-c-bg);
}

html.dark .demo-block__code {
  background: #1e1e1e;
}
</style>
