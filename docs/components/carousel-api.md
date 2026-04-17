# Carousel 轮播图

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| modelValue | - | `number` | 0 |
| items | - | `CarouselItem[]` | () => [] |
| autoplay | - | `boolean` | false |
| interval | - | `number` | 3000 |
| duration | - | `number` | 500 |
| loop | - | `boolean` | true |
| direction | - | `CarouselDirection` | 'horizontal' |
| effect | - | `CarouselEffect` | 'slide' |
| indicatorPosition | - | `CarouselIndicatorPosition` | 'bottom' |
| indicatorType | - | `CarouselIndicatorType` | 'dots' |
| indicatorColor | - | `string` | '#fff' |
| showIndicator | - | `boolean` | true |
| showArrow | - | `boolean` | false |
| pauseOnHover | - | `boolean` | true |
| touchable | - | `boolean` | true |
| touchThreshold | - | `number` | 50 |
| swipeThreshold | - | `number` | 0.3 |
| width | - | `string|number` | '100%' |
| height | - | `string|number` | 'auto' |
| perspective | - | `number` | 1000 |
| scale3d | - | `number` | 0.85 |
| space3d | - | `number` | 0.3 |

## Events

| 事件名 | 说明 | 参数 |
| ------ | ---- | ---- |
| update:modelValue | - | `-` |
| change | - | `-` |
| click | - | `-` |

## Slots

| 插槽名 | 说明 |
| ------ | ---- |
| default | - |

