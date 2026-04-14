<template>
  <div class="demo-block">
    <!-- 预览区域 - H5 模拟器 -->
    <div class="demo-block__preview">
      <div class="h5-device">
        <div class="h5-device__screen">
          <slot />
        </div>
      </div>
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
      <button class="demo-block__btn" @click="toggleDevice">
        {{ deviceType === 'mobile' ? '平板' : '手机' }}
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

const props = defineProps<{
  code?: string
}>()

const showCode = ref(false)
const copied = ref(false)
const deviceType = ref<'mobile' | 'tablet'>('mobile')

const highlightedCode = computed(() => {
  if (!props.code) return ''
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

function toggleDevice() {
  deviceType.value = deviceType.value === 'mobile' ? 'tablet' : 'mobile'
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
  display: flex;
  justify-content: center;
}

/* H5 设备模拟器 */
.h5-device {
  background: #1a1a1a;
  border-radius: 36px;
  padding: 12px;
  box-shadow: 
    0 0 0 2px #333,
    0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
}

/* 顶部刘海 */
.h5-device::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 24px;
  background: #1a1a1a;
  border-radius: 0 0 16px 16px;
  z-index: 10;
}

.h5-device__screen {
  width: 375px;
  height: 667px;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  overflow-y: auto;
  
  /* H5 根字体大小 - 模拟移动端 */
  font-size: 16px;
  
  /* 应用 rem 适配 */
  --hoho-design-width: 375;
}

/* 滚动条样式 */
.h5-device__screen::-webkit-scrollbar {
  width: 4px;
}

.h5-device__screen::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
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
html.dark .h5-device__screen {
  background: #121212;
}

html.dark .demo-block__preview {
  background: var(--vp-c-bg);
}

html.dark .demo-block__code {
  background: #1e1e1e;
}

/* 响应式 - 小屏幕时缩小设备 */
@media (max-width: 480px) {
  .h5-device {
    transform: scale(0.8);
    transform-origin: top center;
  }
  
  .demo-block__preview {
    padding: 12px;
  }
}
</style>
