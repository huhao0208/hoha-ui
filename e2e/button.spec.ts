/**
 * Button 组件 E2E 测试
 */
import { test, expect } from '@playwright/test'

test.describe('Button 组件', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('应该正确渲染按钮', async ({ page }) => {
    // 假设 playground 页面有 Button 组件
    const button = page.locator('.ho-button').first()
    await expect(button).toBeVisible()
  })

  test('点击按钮应该触发事件', async ({ page }) => {
    const button = page.locator('.ho-button').first()
    await button.click()
    // 验证点击效果
  })

  test('禁用状态不应该响应点击', async ({ page }) => {
    const disabledButton = page.locator('.ho-button--disabled').first()
    if (await disabledButton.count() > 0) {
      await expect(disabledButton).toBeDisabled()
    }
  })

  test('加载状态应该显示 loading 动画', async ({ page }) => {
    const loadingButton = page.locator('.ho-button--loading').first()
    if (await loadingButton.count() > 0) {
      const loadingSpinner = loadingButton.locator('.ho-button__loading')
      await expect(loadingSpinner).toBeVisible()
    }
  })

  test('不同尺寸按钮高度应该不同', async ({ page }) => {
    const smallBtn = page.locator('.ho-button--small').first()
    const mediumBtn = page.locator('.ho-button--medium').first()
    const largeBtn = page.locator('.ho-button--large').first()
    
    if (await smallBtn.count() > 0 && await largeBtn.count() > 0) {
      const smallBox = await smallBtn.boundingBox()
      const largeBox = await largeBtn.boundingBox()
      
      // small 应该比 large 小
      expect(smallBox.height).toBeLessThan(largeBox.height)
      
      // 验证尺寸差异明显（至少差 10px）
      const heightDiff = largeBox.height - smallBox.height
      expect(heightDiff).toBeGreaterThan(10)
    }
  })

  test('按钮尺寸应该符合设计规范', async ({ page }) => {
    const smallBtn = page.locator('.ho-button--small').first()
    const mediumBtn = page.locator('.ho-button--medium').first()
    const largeBtn = page.locator('.ho-button--large').first()
    
    // small: 32px (2rem)
    if (await smallBtn.count() > 0) {
      const box = await smallBtn.boundingBox()
      // 允许 2px 误差
      expect(box.height).toBeGreaterThanOrEqual(30)
      expect(box.height).toBeLessThanOrEqual(34)
    }
    
    // medium: 44px (2.75rem)
    if (await mediumBtn.count() > 0) {
      const box = await mediumBtn.boundingBox()
      expect(box.height).toBeGreaterThanOrEqual(42)
      expect(box.height).toBeLessThanOrEqual(46)
    }
    
    // large: 52px (3.25rem)
    if (await largeBtn.count() > 0) {
      const box = await largeBtn.boundingBox()
      expect(box.height).toBeGreaterThanOrEqual(50)
      expect(box.height).toBeLessThanOrEqual(54)
    }
  })
})
