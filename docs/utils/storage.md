# 存储工具函数

浏览器存储相关的实用工具函数，支持 localStorage、sessionStorage 和 Cookie。

## 安装

```typescript
import { localStorage, sessionStorage, cookie } from '@hoha/utils'
```

## localStorage

带有过期时间支持的 localStorage 封装。

### 方法

#### get

获取存储的值。

```typescript
localStorage.get<T>(key: string): T | null
```

**示例**

```typescript
import { localStorage } from '@hoha/utils'

// 获取字符串
const name = localStorage.get<string>('name')

// 获取对象
const user = localStorage.get<{ name: string; age: number }>('user')

// 值不存在或已过期时返回 null
const value = localStorage.get('non-existent-key') // null
```

#### set

存储值，支持设置过期时间。

```typescript
localStorage.set<T>(key: string, value: T, options?: { expire?: number }): void
```

**参数**

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| key | 键名 | `string` |
| value | 值（支持任意可 JSON 序列化的类型） | `T` |
| options | 配置项 | `{ expire?: number }` |

**options**

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| expire | 过期时间（毫秒） | `number` |

**示例**

```typescript
import { localStorage } from '@hoha/utils'

// 存储字符串
localStorage.set('name', 'Hoha UI')

// 存储对象
localStorage.set('user', { name: '张三', age: 25 })

// 设置 1 小时后过期
localStorage.set('token', 'abc123', { expire: 60 * 60 * 1000 })

// 设置 7 天后过期
localStorage.set('theme', 'dark', { expire: 7 * 24 * 60 * 60 * 1000 })
```

#### remove

删除指定键。

```typescript
localStorage.remove(key: string): void
```

**示例**

```typescript
import { localStorage } from '@hoha/utils'

localStorage.remove('name')
localStorage.remove('user')
```

#### clear

清空所有 localStorage 数据。

```typescript
localStorage.clear(): void
```

**示例**

```typescript
import { localStorage } from '@hoha/utils'

localStorage.clear()
```

---

## sessionStorage

与 localStorage 用法相同，但数据在浏览器关闭后会被清除。

### 方法

```typescript
// 获取
sessionStorage.get<T>(key: string): T | null

// 设置
sessionStorage.set<T>(key: string, value: T, options?: { expire?: number }): void

// 删除
sessionStorage.remove(key: string): void

// 清空
sessionStorage.clear(): void
```

**示例**

```typescript
import { sessionStorage } from '@hoha/utils'

// 存储表单草稿
sessionStorage.set('form-draft', {
  title: '文章标题',
  content: '文章内容...'
})

// 获取草稿
const draft = sessionStorage.get('form-draft')

// 提交后清除草稿
sessionStorage.remove('form-draft')
```

---

## cookie

Cookie 操作封装。

### 方法

#### get

获取 Cookie 值。

```typescript
cookie.get(key: string): string | null
```

**示例**

```typescript
import { cookie } from '@hoha/utils'

const sessionId = cookie.get('session_id')
const theme = cookie.get('theme')
```

#### set

设置 Cookie，可指定过期天数。

```typescript
cookie.set(key: string, value: string, days?: number): void
```

**参数**

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 键名 | `string` | — |
| value | 值 | `string` | — |
| days | 过期天数 | `number` | `365` |

**示例**

```typescript
import { cookie } from '@hoha/utils'

// 设置 Cookie，默认 365 天后过期
cookie.set('theme', 'dark')

// 设置 7 天后过期
cookie.set('session_id', 'abc123', 7)

// 设置 1 天后过期
cookie.set('show_guide', 'true', 1)
```

#### remove

删除 Cookie。

```typescript
cookie.remove(key: string): void
```

**示例**

```typescript
import { cookie } from '@hoha/utils'

// 删除 Cookie
cookie.remove('theme')
cookie.remove('session_id')
```

---

## 完整示例

### 用户登录状态管理

```typescript
import { localStorage, cookie } from '@hoha/utils'

interface User {
  id: number
  name: string
  email: string
}

// 登录
function login(user: User, token: string) {
  // 存储 token，7 天过期
  localStorage.set('token', token, { expire: 7 * 24 * 60 * 60 * 1000 })
  
  // 存储用户信息
  localStorage.set('user', user)
  
  // 设置会话 Cookie
  cookie.set('session_id', user.id.toString(), 1)
}

// 检查登录状态
function isLoggedIn(): boolean {
  const token = localStorage.get<string>('token')
  return token !== null
}

// 获取当前用户
function getCurrentUser(): User | null {
  return localStorage.get<User>('user')
}

// 退出登录
function logout() {
  localStorage.remove('token')
  localStorage.remove('user')
  cookie.remove('session_id')
}
```

### 主题切换

```vue
<template>
  <div class="app" :class="{ dark: isDark }">
    <button @click="toggleTheme">
      {{ isDark ? '切换到亮色模式' : '切换到暗色模式' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { localStorage } from '@hoha/utils'

const isDark = ref(false)

// 初始化主题
onMounted(() => {
  const savedTheme = localStorage.get<string>('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

// 切换主题
function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.set('theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
```

### 表单草稿保存

```vue
<template>
  <form @submit.prevent="submit">
    <input v-model="form.title" placeholder="标题" @input="saveDraft" />
    <textarea v-model="form.content" placeholder="内容" @input="saveDraft" />
    <button type="submit">提交</button>
  </form>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { sessionStorage } from '@hoha/utils'

const form = reactive({
  title: '',
  content: ''
})

// 加载草稿
onMounted(() => {
  const draft = sessionStorage.get('post-draft')
  if (draft) {
    Object.assign(form, draft)
  }
})

// 保存草稿（防抖）
let saveTimer: number | null = null
function saveDraft() {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    sessionStorage.set('post-draft', { ...form })
  }, 500)
}

// 提交表单
function submit() {
  // 提交逻辑...
  
  // 清除草稿
  sessionStorage.remove('post-draft')
}
</script>
```
