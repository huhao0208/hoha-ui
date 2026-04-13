<template>
  <div class="playground-container">
    <header class="header">
      <h1>Hoha UI Playground</h1>
      <p class="subtitle">
        组件库开发调试环境
      </p>
    </header>
    
    <main class="main">
      <Demo />
    </main>
  </div>
</template>

<script setup lang="ts">
import Demo from './components/Demo.vue'
</script>

<style lang="less" scoped>
.playground-container {
  min-height: 100vh;
  background: #f5f5f5;
  
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px 20px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    h1 {
      margin: 0 0 10px 0;
      font-size: 2.5rem;
      font-weight: 600;
    }
    
    .subtitle {
      margin: 0;
      font-size: 1.1rem;
      opacity: 0.9;
    }
  }
  
  .main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
}
</style>
