<template>
  <div class="demo-preview-wrapper">
    <div class="demo-preview-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无需逻辑
</script>

<style scoped>
.demo-preview-wrapper {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg, #ffffff);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.demo-preview-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1, #3b82f6);
}

.demo-preview-content {
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  min-height: 80px;
}

/* 深色模式 */
html.dark .demo-preview-wrapper {
  background: var(--vp-c-bg, #1e1e1e);
  border-color: var(--vp-c-divider, #333);
}

html.dark .demo-preview-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 平板端适配 */
@media screen and (max-width: 768px) {
  .demo-preview-content {
    padding: 24px;
    gap: 12px;
    min-height: 60px;
  }
  
  .demo-preview-wrapper {
    margin: 20px 0;
    border-radius: 10px;
  }
}

/* 手机端适配 */
@media screen and (max-width: 480px) {
  .demo-preview-content {
    padding: 16px;
    gap: 8px;
    min-height: 48px;
  }
  
  .demo-preview-wrapper {
    margin: 16px 0;
    border-radius: 8px;
  }
}

/* 小屏幕 */
@media screen and (max-width: 375px) {
  .demo-preview-content {
    padding: 12px;
    gap: 6px;
  }
  
  .demo-preview-wrapper {
    margin: 12px 0;
    border-radius: 6px;
  }
}
</style>
