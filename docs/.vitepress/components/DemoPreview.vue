<template>
  <div class="demo-preview">
    <slot></slot>
  </div>
</template>

<style scoped>
.demo-preview {
  padding: 16px;
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

html.dark .demo-preview {
  background: #1f2937;
}
</style>
