<template>
  <div class="h5-preview-wrapper">
    <div class="h5-device">
      <div class="h5-device__notch"></div>
      <iframe 
        ref="iframeRef"
        class="h5-device__screen"
        :srcdoc="iframeContent"
        sandbox="allow-scripts"
      ></iframe>
    </div>
    <div class="h5-controls">
      <label>
        rem基准: 
        <input 
          type="range" 
          min="12" 
          max="50" 
          :value="remBase"
          @input="updateRem"
        >
        <span>{{ remBase }}px</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, useSlots } from 'vue'

const props = defineProps<{
  remBase?: number
}>()

const slots = useSlots()
const iframeRef = ref<HTMLIFrameElement | null>(null)
const remBase = ref(props.remBase || 18.75)

// 获取 slot 内容并生成 HTML
const iframeContent = computed(() => {
  // 注意：slot 内容在 SSR 时可能为空
  const slotHtml = slots.default ? renderSlot(slots.default()) : ''
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    :root {
      --hoho-color-primary: #3b82f6;
      --hoho-color-success: #10b981;
      --hoho-color-warning: #f59e0b;
      --hoho-color-danger: #ef4444;
      --hoho-color-info: #06b6d4;
      --hoho-color-secondary: #6b7280;
      --hoho-text-primary: #1f2937;
      --hoho-text-secondary: #4b5563;
      --hoho-bg-primary: #ffffff;
      --hoho-bg-secondary: #f3f4f6;
      --hoho-border-color: #e5e7eb;
      --hoho-radius-sm: 0.25rem;
      --hoho-radius-md: 0.5rem;
      --hoho-radius-lg: 0.75rem;
      --hoho-spacing-sm: 0.25rem;
      --hoho-spacing-md: 0.5rem;
    }
    
    @media (prefers-color-scheme: dark) {
      :root {
        --hoho-text-primary: #f3f4f6;
        --hoho-bg-primary: #1f2937;
        --hoho-border-color: #374151;
      }
      body { background: #1f2937; }
    }
    
    html { font-size: ${remBase.value}px; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 0.4rem;
      line-height: 1.5;
      background: var(--hoho-bg-primary);
      color: var(--hoho-text-primary);
    }
    
    .preview-content {
      padding: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="preview-content">
    ${slotHtml}
  </div>
</body>
</html>
`
})

function renderSlot(vnodes: any[]): string {
  // 简单实现：将 VNode 渲染为 HTML 字符串
  // 在实际 SSR 环境中需要更完整的实现
  return ''
}

function updateRem(e: Event) {
  const target = e.target as HTMLInputElement
  remBase.value = parseFloat(target.value)
  
  if (iframeRef.value?.contentWindow) {
    iframeRef.value.contentWindow.postMessage({
      type: 'setFontSize',
      fontSize: remBase.value
    }, '*')
  }
}

onMounted(() => {
  // 监听来自 iframe 的消息
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'setFontSize') {
      remBase.value = e.data.fontSize
    }
  })
})
</script>

<style scoped>
.h5-preview-wrapper {
  margin: 24px 0;
}

.h5-device {
  width: 375px;
  background: linear-gradient(145deg, #2d2d2d, #1a1a1a);
  border-radius: 44px;
  padding: 12px;
  margin: 0 auto;
  position: relative;
  box-shadow: 
    0 0 0 3px #333,
    0 0 0 6px #1a1a1a,
    0 20px 50px rgba(0, 0, 0, 0.4);
}

.h5-device__notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 28px;
  background: #1a1a1a;
  border-radius: 0 0 20px 20px;
  z-index: 10;
}

.h5-device__notch::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 6px;
  background: #333;
  border-radius: 3px;
}

.h5-device__screen {
  width: 100%;
  height: 500px;
  border: none;
  border-radius: 32px;
  background: #fff;
  display: block;
  margin-top: 16px;
}

.h5-controls {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.h5-controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.h5-controls input[type="range"] {
  width: 120px;
  accent-color: var(--vp-c-brand-1);
}

html.dark .h5-device {
  background: linear-gradient(145deg, #3d3d3d, #2a2a2a);
}

html.dark .h5-device__notch { background: #2a2a2a; }
html.dark .h5-device__notch::after { background: #444; }
</style>
