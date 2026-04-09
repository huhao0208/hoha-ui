# 格式化工具函数

数据格式化相关的实用工具函数。

## 安装

```typescript
import { formatDate, formatNumber, formatSize } from '@hohaya/hoho-utils'
```

## 方法列表

### formatDate

格式化日期。

```typescript
function formatDate(date: Date | string | number, format?: string): string
```

**参数**

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| date | 日期对象、日期字符串或时间戳 | `Date \| string \| number` | — |
| format | 格式化模式 | `string` | `'YYYY-MM-DD'` |

**格式化模式**

| 占位符 | 说明 | 示例 |
| --- | --- | --- |
| YYYY | 四位年份 | 2024 |
| MM | 两位月份 | 01-12 |
| DD | 两位日期 | 01-31 |
| HH | 两位小时 | 00-23 |
| mm | 两位分钟 | 00-59 |
| ss | 两位秒数 | 00-59 |

**示例**

```typescript
import { formatDate } from '@hohaya/hoho-utils'

// 使用 Date 对象
formatDate(new Date()) // '2024-01-15'
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') // '2024-01-15 10:30:45'
formatDate(new Date(), 'YYYY/MM/DD') // '2024/01/15'

// 使用时间戳
formatDate(1705286445000) // '2024-01-15'

// 使用日期字符串
formatDate('2024-01-15T10:30:45', 'YYYY年MM月DD日') // '2024年01月15日'
```

---

### formatNumber

格式化数字，添加千分位分隔符。

```typescript
function formatNumber(num: number, decimals?: number): string
```

**参数**

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| num | 要格式化的数字 | `number` | — |
| decimals | 小数位数 | `number` | `0` |

**返回值**

- `string` - 格式化后的数字字符串

**示例**

```typescript
import { formatNumber } from '@hohaya/hoho-utils'

// 基本用法
formatNumber(1234567) // '1,234,567'
formatNumber(1234567.89) // '1,234,568'（默认四舍五入到整数）

// 指定小数位数
formatNumber(1234567.89, 2) // '1,234,567.89'
formatNumber(1234567.895, 2) // '1,234,567.90'（四舍五入）
formatNumber(1234.5, 2) // '1,234.50'

// 小数字
formatNumber(123, 2) // '123.00'
formatNumber(0, 2) // '0.00'
```

---

### formatSize

格式化文件大小，自动转换单位。

```typescript
function formatSize(bytes: number): string
```

**参数**

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| bytes | 字节数 | `number` |

**返回值**

- `string` - 格式化后的大小字符串，单位包括 B、KB、MB、GB、TB

**示例**

```typescript
import { formatSize } from '@hohaya/hoho-utils'

formatSize(0) // '0 B'
formatSize(500) // '500 B'
formatSize(1024) // '1 KB'
formatSize(1536) // '1.5 KB'
formatSize(1048576) // '1 MB'
formatSize(1572864) // '1.5 MB'
formatSize(1073741824) // '1 GB'
formatSize(1099511627776) // '1 TB'

// 文件上传场景
const file = document.querySelector('input[type="file"]').files[0]
console.log(`文件大小: ${formatSize(file.size)}`)
```

## 完整示例

```vue
<template>
  <div class="demo">
    <div class="item">
      <h4>日期格式化</h4>
      <p>当前日期: {{ currentDate }}</p>
      <p>完整格式: {{ fullDate }}</p>
    </div>
    
    <div class="item">
      <h4>数字格式化</h4>
      <p>原始数字: {{ rawNumber }}</p>
      <p>格式化后: {{ formattedNumber }}</p>
      <p>保留2位小数: {{ formattedNumberWithDecimals }}</p>
    </div>
    
    <div class="item">
      <h4>文件大小格式化</h4>
      <p>文件大小: {{ formattedSize }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate, formatNumber, formatSize } from '@hohaya/hoho-utils'

// 日期
const currentDate = computed(() => formatDate(new Date()))
const fullDate = computed(() => formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'))

// 数字
const rawNumber = 1234567.891
const formattedNumber = computed(() => formatNumber(rawNumber))
const formattedNumberWithDecimals = computed(() => formatNumber(rawNumber, 2))

// 文件大小
const bytes = 1572864
const formattedSize = computed(() => formatSize(bytes))
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item {
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
}

.item h4 {
  margin: 0 0 12px;
  color: #374151;
}

.item p {
  margin: 4px 0;
  font-family: monospace;
}
</style>
```

## 实际应用场景

### 显示文章发布时间

```typescript
import { formatDate } from '@hohaya/hoho-utils'

interface Article {
  title: string
  createdAt: string | number
}

const article: Article = {
  title: '如何使用 Hoha UI',
  createdAt: '2024-01-15T10:30:00Z'
}

const publishTime = formatDate(article.createdAt, 'YYYY-MM-DD HH:mm')
console.log(`发布于 ${publishTime}`)
```

### 显示金额

```typescript
import { formatNumber } from '@hohaya/hoho-utils'

const price = 99999.99
const displayPrice = formatNumber(price, 2)
console.log(`¥${displayPrice}`) // ¥99,999.99
```

### 文件上传进度

```typescript
import { formatSize } from '@hohaya/hoho-utils'

const file = {
  name: 'video.mp4',
  size: 157286400 // 150MB
}

console.log(`准备上传 ${file.name} (${formatSize(file.size)})`)

// 上传完成后
console.log(`${file.name} (${formatSize(file.size)}) 上传完成`)
```
