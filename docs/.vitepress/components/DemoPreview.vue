<template>
  <div class="demo-preview">
    <slot></slot>
  </div>
</template>

<style scoped>
.demo-preview {
  /* 预览区域使用 rem 单位 - 基于 37.5px */
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

html.dark .demo-preview {
  background: #1f2937;
}
</style>
