<template>
  <div class="demo-preview-wrapper" ref="wrapperRef">
    <div class="demo-preview-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const wrapperRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

// 基于 375px 设计稿设置 rem
function setRootFontSize() {
  if (!wrapperRef.value) return
  // 375px 设计稿 → 18.75px 根字体
  const fontSize = 18.75
  wrapperRef.value.style.fontSize = fontSize + 'px'
}

onMounted(() => {
  setRootFontSize()
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.demo-preview-wrapper {
  padding: 0.853rem; /* 16px / 18.75 = 0.853rem */
  margin: 0.853rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.427rem; /* 8px / 18.75 */
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 0.427rem;
  align-items: center;
}

html.dark .demo-preview-wrapper {
  background: #1f2937;
}
</style>
