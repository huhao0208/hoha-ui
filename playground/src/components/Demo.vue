<template>
  <div class="demo-container">
    <!-- Button 组件 -->
    <section class="demo-section">
      <h2>Button 组件</h2>
      <div class="component-showcase">
        <div class="button-row">
          <HoButton>默认按钮</HoButton>
          <HoButton type="primary">主要按钮</HoButton>
          <HoButton type="success">成功按钮</HoButton>
          <HoButton type="warning">警告按钮</HoButton>
          <HoButton type="danger">危险按钮</HoButton>
        </div>
        <div class="button-row">
          <HoButton size="small" type="primary">小型按钮</HoButton>
          <HoButton size="medium" type="primary">中型按钮</HoButton>
          <HoButton size="large" type="primary">大型按钮</HoButton>
        </div>
        <div class="button-row">
          <HoButton type="primary" disabled>禁用按钮</HoButton>
          <HoButton type="primary" loading>加载中</HoButton>
        </div>
      </div>
    </section>

    <!-- Input 组件 -->
    <section class="demo-section">
      <h2>Input 组件</h2>
      <div class="component-showcase">
        <div class="input-row">
          <HoInput v-model="inputValue" placeholder="请输入内容" />
          <HoInput v-model="inputValue" type="password" placeholder="密码输入" />
        </div>
      </div>
    </section>

    <!-- Carousel 组件 -->
    <section class="demo-section">
      <h2>Carousel 组件</h2>
      <div class="component-showcase">
        <HoCarousel 
          :items="carouselItems" 
          height="200px"
          autoplay
        />
      </div>
    </section>

    <!-- Carousel 3D -->
    <section class="demo-section">
      <h2>Carousel 3D 模式</h2>
      <div class="component-showcase">
        <HoCarousel 
          :items="carouselItems" 
          effect="3d"
          height="200px"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HoButton from '@hohaya/hoho/button'
import HoInput from '@hohaya/hoho/input'
import HoCarousel from '@hohaya/hoho/carousel'

const inputValue = ref('')
const carouselItems = [
  { image: 'https://picsum.photos/400/200?random=1' },
  { image: 'https://picsum.photos/400/200?random=2' },
  { image: 'https://picsum.photos/400/200?random=3' }
]
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
      .button-row {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }
      
      .input-row {
        display: flex;
        gap: 16px;
        max-width: 300px;
      }
    }
  }
}
</style>
