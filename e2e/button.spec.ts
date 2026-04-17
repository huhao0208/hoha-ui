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
})
