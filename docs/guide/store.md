# 全局状态管理

Hoha UI 提供内置的全局状态管理，支持组件间数据共享，同时暴露给宿主项目使用。

## 为什么需要全局状态？

组件库中的组件可能需要：
1. **组件间通信** - 如 NavBar 与 TabBar 联动
2. **共享配置** - 主题、语言、API 地址等
3. **业务数据** - 用户信息、购物车、权限等

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

## 在组件中使用

### Composition API

```vue
<script setup>
import { useGlobalState, useConfig, useTheme } from '@hohaya/hoha'

const { 
  user, setUser,
  cart, addToCart, cartCount,
  data, setData, getData,
  activeTab, setActiveTab,
  loading, setLoading 
} = useGlobalState()

const config = useConfig()
const theme = useTheme()

// 使用配置
console.log(config.value.apiBaseURL)

// 使用主题
const toggleDark = () => {
  setTheme({ mode: theme.value.mode === 'dark' ? 'light' : 'dark' })
}

// 业务数据
const handleLogin = (userData) => {
  setUser(userData)
}

const handleAddToCart = (item) => {
  addToCart(item)
}
</script>
```

### Options API

```vue
<script>
export default {
  methods: {
    getUser() {
      return this.$hohaState.user.value
    },
    setConfig(key, value) {
      this.$hohaConfig.value[key] = value
    }
  }
}
</script>
```

## API

### useGlobalState()

获取全局状态对象。

```typescript
const state = useGlobalState()

// 用户
state.user.value          // 当前用户
state.setUser(userData)    // 设置用户

// 购物车
state.cart.value           // 购物车列表
state.addToCart(item)      // 添加商品
state.removeFromCart(id)   // 移除商品
state.clearCart()          // 清空购物车
state.cartCount.value      // 商品数量

// 通用存储
state.data.value           // 数据存储对象
state.setData(key, value)  // 存储数据
state.getData(key)         // 获取数据
state.removeData(key)      // 移除数据

// 导航
state.activeTab.value      // 当前标签
state.setActiveTab(tab)    // 设置标签

// 加载
state.loading.value        // 加载状态
state.setLoading(bool)     // 设置状态
```

### useConfig()

获取配置对象。

```typescript
const config = useConfig()

config.value.appName       // 应用名称
config.value.apiBaseURL    // API 地址
config.value.apiTimeout    // 超时时间
config.value.enableDebug   // 调试模式
```

### setConfig(config)

更新配置。

```typescript
import { setConfig } from '@hohaya/hoha'

setConfig({
  apiBaseURL: 'https://api.example.com/v2',
  enableDebug: true
})
```

### useTheme()

获取主题配置。

```typescript
const theme = useTheme()

theme.value.mode           // 'light' | 'dark' | 'auto'
theme.value.primaryColor   // 主色
```

### setTheme(theme)

更新主题。

```typescript
import { setTheme } from '@hohaya/hoho'

setTheme({
  mode: 'dark',
  primaryColor: '#60a5fa'
})
```

### toggleDarkMode()

切换暗色模式。

```typescript
import { toggleDarkMode } from '@hohaya/hoha'

toggleDarkMode()  // light ↔ dark
```

## 宿主项目使用

在宿主项目中直接使用这些 API：

```typescript
// 任何文件中
import { useGlobalState, setConfig, setTheme } from '@hohaya/hoha'

// 获取全局状态
const state = useGlobalState()
console.log(state.user.value)

// 设置配置
setConfig({ apiBaseURL: '/api' })

// 设置主题
setTheme({ mode: 'dark' })
```

## 与 Vuex/Pinia 共存

Hoha UI 的全局状态与 Vuex/Pinia 完全独立，可以共存：

```typescript
// store/user.ts (Pinia)
import { defineStore } from 'pinia'
import { useGlobalState } from '@hohaya/hoha'

export const useUserStore = defineStore('user', {
  state: () => ({
    // Hoha UI 全局状态
    hohaState: useGlobalState()
  }),
  
  actions: {
    login(userData) {
      // 同步到 Hoha UI
      this.hohaState.setUser(userData)
    }
  }
})
```

## 完整示例

```vue
<template>
  <div>
    <!-- 显示用户信息 -->
    <div v-if="user">
      欢迎, {{ user.name }}
    </div>
    
    <!-- 购物车 -->
    <div>
      购物车 ({{ cartCount }})
    </div>
    
    <!-- 主题切换 -->
    <button @click="toggleDarkMode">
      {{ theme.mode === 'dark' ? '浅色' : '深色' }}
    </button>
  </div>
</template>

<script setup>
import { 
  useGlobalState, 
  useTheme, 
  toggleDarkMode 
} from '@hohaya/hoho'

const { user, cartCount } = useGlobalState()
const theme = useTheme()
</script>
```
