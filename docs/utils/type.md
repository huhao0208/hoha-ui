# 类型判断工具函数

JavaScript 类型判断相关的实用工具函数。

## 安装

```typescript
import { 
  isType,
  isArray,
  isObject,
  isFunction,
  isString,
  isNumber,
  isBoolean,
  isNull,
  isUndefined,
  isEmpty,
  isPlainObject
} from '@hoha/utils'
```

## 方法列表

### isType

通用类型判断函数。

```typescript
function isType(value: unknown, type: string): boolean
```

**参数**

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| value | 要判断的值 | `unknown` |
| type | 类型名称（如 'Object', 'Array', 'String' 等） | `string` |

**返回值**

- `boolean` - 是否为指定类型

**示例**

```typescript
import { isType } from '@hoha/utils'

isType([1, 2, 3], 'Array') // true
isType({}, 'Object') // true
isType('hello', 'String') // true
isType(123, 'Number') // true
```

---

### isArray

判断是否为数组。

```typescript
function isArray(value: unknown): value is unknown[]
```

**示例**

```typescript
import { isArray } from '@hoha/utils'

isArray([1, 2, 3]) // true
isArray('hello') // false
isArray({}) // false
isArray(null) // false

// 类型守卫
const value: unknown = [1, 2, 3]
if (isArray(value)) {
  // TypeScript 知道 value 是数组
  value.forEach(item => console.log(item))
}
```

---

### isObject

判断是否为对象（不包括数组、null 等）。

```typescript
function isObject(value: unknown): value is Record<string, unknown>
```

**示例**

```typescript
import { isObject } from '@hoha/utils'

isObject({}) // true
isObject({ name: 'Hoha' }) // true
isObject([1, 2, 3]) // false
isObject(null) // false
isObject('string') // false
```

---

### isFunction

判断是否为函数。

```typescript
function isFunction(value: unknown): value is Function
```

**示例**

```typescript
import { isFunction } from '@hoha/utils'

isFunction(() => {}) // true
isFunction(function() {}) // true
isFunction(class {}) // true
isFunction('function') // false
isObject({}) // false
```

---

### isString

判断是否为字符串。

```typescript
function isString(value: unknown): value is string
```

**示例**

```typescript
import { isString } from '@hoha/utils'

isString('hello') // true
isString('') // true
isString(123) // false
isString(null) // false
isString(undefined) // false
```

---

### isNumber

判断是否为数字（排除 NaN）。

```typescript
function isNumber(value: unknown): value is number
```

**示例**

```typescript
import { isNumber } from '@hoha/utils'

isNumber(123) // true
isNumber(0) // true
isNumber(-5.5) // true
isNumber(NaN) // false（NaN 被排除）
isNumber('123') // false
isNumber(Infinity) // true
```

---

### isBoolean

判断是否为布尔值。

```typescript
function isBoolean(value: unknown): value is boolean
```

**示例**

```typescript
import { isBoolean } from '@hoha/utils'

isBoolean(true) // true
isBoolean(false) // true
isBoolean(1) // false
isBoolean('true') // false
isBoolean(null) // false
```

---

### isNull

判断是否为 null。

```typescript
function isNull(value: unknown): value is null
```

**示例**

```typescript
import { isNull } from '@hoha/utils'

isNull(null) // true
isNull(undefined) // false
isNull('') // false
isNull(0) // false
```

---

### isUndefined

判断是否为 undefined。

```typescript
function isUndefined(value: unknown): value is undefined
```

**示例**

```typescript
import { isUndefined } from '@hoha/utils'

isUndefined(undefined) // true
isUndefined(null) // false
isUndefined(void 0) // true
isUndefined('') // false
```

---

### isEmpty

判断是否为空值。

支持判断以下类型：
- `null` 和 `undefined`
- 空字符串 `''`
- 空数组 `[]`
- 空对象 `{}`

```typescript
function isEmpty(value: unknown): boolean
```

**示例**

```typescript
import { isEmpty } from '@hoha/utils'

// null 和 undefined
isEmpty(null) // true
isEmpty(undefined) // true

// 字符串
isEmpty('') // true
isEmpty('  ') // true（trim 后为空）
isEmpty('hello') // false

// 数组
isEmpty([]) // true
isEmpty([1, 2]) // false

// 对象
isEmpty({}) // true
isEmpty({ name: 'Hoha' }) // false

// 其他
isEmpty(0) // false
isEmpty(false) // false
```

---

### isPlainObject

判断是否为纯对象（通过 `{}` 或 `new Object()` 创建的对象）。

```typescript
function isPlainObject(value: unknown): value is Record<string, unknown>
```

**示例**

```typescript
import { isPlainObject } from '@hoha/utils'

isPlainObject({}) // true
isPlainObject({ name: 'Hoha' }) // true
isPlainObject(Object.create(null)) // true
isPlainObject(new Date()) // false
isPlainObject([]) // false
isPlainObject(null) // false

// 区别于 isObject
class MyClass {}
const instance = new MyClass()

isObject(instance) // true
isPlainObject(instance) // false
```

---

## 完整示例

### 参数校验

```typescript
import { isString, isNumber, isObject, isArray, isFunction } from '@hoha/utils'

interface User {
  name: string
  age: number
  tags: string[]
}

function createUser(data: unknown): User {
  // 校验参数
  if (!isObject(data)) {
    throw new Error('参数必须是对象')
  }
  
  if (!isString(data.name)) {
    throw new Error('name 必须是字符串')
  }
  
  if (!isNumber(data.age)) {
    throw new Error('age 必须是数字')
  }
  
  if (!isArray(data.tags)) {
    throw new Error('tags 必须是数组')
  }
  
  return data as User
}

// 使用
const user = createUser({
  name: '张三',
  age: 25,
  tags: ['developer', 'vue']
})
```

### 深拷贝中的类型判断

```typescript
import { isArray, isPlainObject } from '@hoha/utils'

function deepClone<T>(value: T): T {
  // 基本类型直接返回
  if (typeof value !== 'object' || value === null) {
    return value
  }
  
  // 数组
  if (isArray(value)) {
    return value.map(item => deepClone(item)) as T
  }
  
  // 纯对象
  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {}
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepClone((value as Record<string, unknown>)[key])
      }
    }
    return result as T
  }
  
  // 其他类型（Date, RegExp 等）返回原引用
  return value
}
```

### 条件处理

```typescript
import { isEmpty, isString, isNumber } from '@hoha/utils'

function formatValue(value: unknown): string {
  // 空值处理
  if (isEmpty(value)) {
    return '-'
  }
  
  // 字符串
  if (isString(value)) {
    return value.trim()
  }
  
  // 数字
  if (isNumber(value)) {
    return value.toLocaleString()
  }
  
  // 其他类型转字符串
  return String(value)
}

// 使用
formatValue(null) // '-'
formatValue('  hello  ') // 'hello'
formatValue(1234567) // '1,234,567'
formatValue([1, 2, 3]) // '1,2,3'
```

### API 响应处理

```typescript
import { isObject, isArray, isString } from '@hoha/utils'

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

async function fetchUser(id: number): Promise<User | null> {
  const response = await fetch(`/api/users/${id}`)
  const result: unknown = await response.json()
  
  // 类型守卫校验响应
  if (!isObject(result)) {
    throw new Error('无效的响应格式')
  }
  
  if (result.code !== 200) {
    if (isString(result.message)) {
      throw new Error(result.message)
    }
    throw new Error('请求失败')
  }
  
  return result.data as User
}
```

## 类型守卫

这些类型判断函数都可以作为 TypeScript 的类型守卫使用：

```typescript
import { isString, isNumber } from '@hoha/utils'

function process(value: unknown) {
  if (isString(value)) {
    // 这里 TypeScript 知道 value 是 string 类型
    console.log(value.toUpperCase())
  } else if (isNumber(value)) {
    // 这里 TypeScript 知道 value 是 number 类型
    console.log(value.toFixed(2))
  }
}
```
