<template>
  <div class="demo-preview-wrapper">
    <div class="demo-preview-content" :style="{ fontSize: remSize + 'px' }">
      <slot></slot>
    </div>
    <div class="demo-preview-controls">
      <span>rem:</span>
      <input type="range" min="12" max="50" step="0.5" :value="remSize" @input="onInput">
      <span class="rem-value">{{ remSize }}px</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const remSize = ref(18.75)

function onInput(e: Event) {
  remSize.value = parseFloat((e.target as HTMLInputElement).value)
}
</script>

<style scoped>
.demo-preview-wrapper {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.demo-preview-content {
  padding: 16px;
  background: #fff;
  min-height: 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

html.dark .demo-preview-content {
  background: #1f2937;
}

.demo-preview-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.demo-preview-controls input[type="range"] {
  width: 80px;
  accent-color: var(--vp-c-brand-1);
}

.rem-value {
  font-family: monospace;
  min-width: 50px;
}
</style>
