# 全局状态管理

Hoha UI 提供内置的全局状态管理，支持组件间数据共享，同时暴露给宿主项目使用。

## 为什么需要全局状态？

组件库中的组件可能需要：
1. **组件间通信** - 如 NavBar 与 TabBar 联动
2. **共享配置** - 主题、语言、API 地址等
3. **业务数据** - 用户信息、购物车、权限等

## 响应式验证

<div class="demo-preview">
  <div id="store-demo">
    <p>用户: {{ userName }}</p>
    <p>购物车数量: {{ cartCount }}</p>
    <button class="demo-btn" @click="setUser">设置用户</button>
    <button class="demo-btn" @click="addToCart">添加商品</button>
    <button class="demo-btn" @click="toggleTheme">切换主题</button>
    <p>当前主题: {{ themeMode }}</p>
  </div>
</div>

<script setup>
import { computed } from 'vue'
import { useGlobalState, useTheme, setTheme, getTheme } from '@hohaya/hoho'

const state = useGlobalState()
const theme = useTheme()

const userName = computed(() => state.user.value?.name || '未登录')
const cartCount = computed(() => state.cartCount.value)
const themeMode = computed(() => theme.value.mode)

const setUser = () => {
  state.setUser({ id: 1, name: 'Admin' })
}

const addToCart = () => {
  state.addToCart({ id: Date.now(), name: '商品 ' + Date.now() })
}

const toggleTheme = () => {
  setTheme({ mode: theme.value.mode === 'dark' ? 'light' : 'dark' })
}
</script>

<style scoped>
.demo-btn {
  margin: 4px;
  padding: 8px 16px;
  background: var(--hoho-color-primary, #3b82f6);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.demo-btn:hover {
  opacity: 0.9;
}
</style>

**测试步骤：**
1. 点击"设置用户" → 用户名立即更新
2. 点击"添加商品" → 购物车数量实时增加
3. 点击"切换主题" → 主题模式切换

## 安装

```typescript
// main.ts
import { createApp } from 'vue'
import HohaUI from '@hohaya/hoha'
import '@hohaya/hoha/style.css'

const app = createApp(App)

app.use(HohaUI, {
  store: {
    config: {
      appName: '我的应用',
      apiBaseURL: 'https://api.example.com'
    },
    theme: {
      mode: 'light',
      primaryColor: '#3b82f6'
    },
    initialState: {
      user: { id: 1, name: 'Admin' }
    }
  }
})

app.mount('#app')
```

## API

### useGlobalState()

获取全局状态对象，所有属性都是响应式的。

```typescript
const state = useGlobalState()

// 用户 - 响应式
state.user.value          // 当前用户
state.setUser(userData)    // 设置用户 → 触发更新

// 购物车 - 响应式
state.cart.value           // 购物车列表
state.addToCart(item)      // 添加商品 → 触发 cartCount 更新
state.cartCount.value      // 计算属性，自动响应

// 通用存储 - 响应式
state.data.value           // 数据存储对象
state.setData(key, value)  // 存储数据 → 触发更新
```

### useConfig() / useTheme()

配置和主题也是响应式的：

```typescript
const config = useConfig()
const theme = useTheme()

// 监听配置变化
watch(() => config.value.apiBaseURL, (newVal) => {
  console.log('API 地址变化:', newVal)
})

// 监听主题变化
watch(() => theme.value.mode, (newVal) => {
  console.log('主题变化:', newVal)
})
```

## 与宿主项目联动

```vue
<template>
  <div>
    <!-- 组件 A 修改数据 -->
    <button @click="login">登录</button>
    
    <!-- 组件 B 自动响应 -->
    <div v-if="user">欢迎, {{ user.name }}</div>
  </div>
</template>

<script setup>
import { useGlobalState } from '@hohaya/hoho'

const { user, setUser } = useGlobalState()

const login = () => {
  setUser({ id: 1, name: 'Admin' })  // 所有使用 user 的组件自动更新
}
</script>
```

## 原理

基于 Vue 3 响应式系统：

```typescript
// 使用 ref 包装基础类型
const user = ref<any>(null)

// 使用 computed 派生计算
const cartCount = computed(() => cart.value.length)

// watch 监听变化
watch(user, (newUser) => {
  console.log('用户变化:', newUser)
})
```

Vue 2 项目通过 `@vue/composition-api` 同样支持响应式。
