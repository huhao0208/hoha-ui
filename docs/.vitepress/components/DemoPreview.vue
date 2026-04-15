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

onMounted(() => {
  // 移动端适配已通过 CSS 处理
})

onUnmounted(() => {
  // cleanup
})
</script>

<style scoped>
.demo-preview-wrapper {
  padding: 16px;
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  max-width: 100%;
  box-sizing: border-box;
}

html.dark .demo-preview-wrapper {
  background: #1f2937;
}

/* 手机端适配 */
@media screen and (max-width: 767px) {
  .demo-preview-wrapper {
    padding: 12px;
    margin: 12px 0;
    gap: 6px;
    border-radius: 6px;
  }
}

/* 更小屏幕 */
@media screen and (max-width: 375px) {
  .demo-preview-wrapper {
    padding: 8px;
    margin: 8px 0;
    gap: 4px;
  }
}
</style>
