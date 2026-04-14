<template>
  <div class="demo-preview-wrapper" ref="wrapperRef">
    <div class="demo-preview-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const wrapperRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // 设置预览区域的 rem 基准为 37.5px（基于 375px 设计稿）
  if (wrapperRef.value) {
    wrapperRef.value.style.fontSize = '37.5px'
  }
})
</script>

<style scoped>
.demo-preview-wrapper {
  /* 所有尺寸使用 rem - 基于 37.5px */
  padding: 0.43rem; /* 16px */
  margin: 0.43rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.21rem; /* 8px */
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 0.21rem; /* 8px */
  align-items: center;
}

html.dark .demo-preview-wrapper {
  background: #1f2937;
}
</style>
