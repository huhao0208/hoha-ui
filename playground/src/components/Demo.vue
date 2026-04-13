<template>
  <div class="demo-container">
    <section class="demo-section">
      <h2>Button 组件</h2>
      <div class="component-showcase">
        <div class="placeholder">
          <span class="placeholder-text">Button 组件占位符</span>
          <span class="placeholder-status">待开发</span>
        </div>
        <p class="description">
          基础的按钮组件，支持多种类型和尺寸
        </p>
      </div>
    </section>
    
    <section class="demo-section">
      <h2>Input 组件</h2>
      <div class="component-showcase">
        <div class="placeholder">
          <span class="placeholder-text">Input 组件占位符</span>
          <span class="placeholder-status">待开发</span>
        </div>
        <p class="description">
          输入框组件，支持多种输入类型和状态
        </p>
      </div>
    </section>
    
    <section class="demo-section">
      <h2>Icon 组件</h2>
      <div class="component-showcase">
        <div class="placeholder">
          <span class="placeholder-text">Icon 组件占位符</span>
          <span class="placeholder-status">待开发</span>
        </div>
        <p class="description">
          图标组件，支持多种图标库
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 组件占位符 - 实际组件开发完成后替换为真实组件
// import { Button, Input, Icon } from '@hohaya/hoho'
</script>

<style lang="less" scoped>
.demo-container {
  .demo-section {
    background: white;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    h2 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 1.5rem;
      font-weight: 600;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }
    
    .component-showcase {
      .placeholder {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-radius: 8px;
        padding: 60px 40px;
        text-align: center;
        margin-bottom: 20px;
        border: 2px dashed #999;
        
        .placeholder-text {
          display: block;
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 10px;
        }
        
        .placeholder-status {
          display: inline-block;
          background: #ff9800;
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
      
      .description {
        color: #666;
        line-height: 1.6;
        margin: 0;
      }
    }
  }
}
</style>
