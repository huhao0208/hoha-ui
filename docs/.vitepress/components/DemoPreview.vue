<template>
  <div class="demo-preview-wrapper">
    <div class="demo-preview-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无需逻辑
// CSS 变量已在样式中定义固定尺寸
</script>

<style scoped>
/* 固定 375px 设计稿尺寸变量 */
.demo-preview-wrapper {
  /* 375px 设计稿按钮尺寸 */
  --ho-small-height: 28px;
  --ho-small-padding: 16px;
  --ho-small-font-size: 12px;
  --ho-small-radius: 4px;
  
  --ho-medium-height: 36px;
  --ho-medium-padding: 24px;
  --ho-medium-font-size: 14px;
  --ho-medium-radius: 6px;
  
  --ho-large-height: 44px;
  --ho-large-padding: 32px;
  --ho-large-font-size: 16px;
  --ho-large-radius: 8px;
  
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

.demo-preview-content :deep(.ho-button) {
  /* 确保按钮使用固定尺寸 */
  height: var(--ho-medium-height, 36px);
  padding: 0 var(--ho-medium-padding, 24px);
  font-size: var(--ho-medium-font-size, 14px);
}

.demo-preview-content :deep(.ho-button--small) {
  height: var(--ho-small-height, 28px);
  padding: 0 var(--ho-small-padding, 16px);
  font-size: var(--ho-small-font-size, 12px);
  border-radius: var(--ho-small-radius, 4px);
}

.demo-preview-content :deep(.ho-button--medium) {
  height: var(--ho-medium-height, 36px);
  padding: 0 var(--ho-medium-padding, 24px);
  font-size: var(--ho-medium-font-size, 14px);
  border-radius: var(--ho-medium-radius, 6px);
}

.demo-preview-content :deep(.ho-button--large) {
  height: var(--ho-large-height, 44px);
  padding: 0 var(--ho-large-padding, 32px);
  font-size: var(--ho-large-font-size, 16px);
  border-radius: var(--ho-large-radius, 8px);
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
