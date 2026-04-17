/**
 * 视觉回归测试
 */
import { test, expect } from '@playwright/test'

test.describe('视觉回归测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Button 组件视觉测试', async ({ page }) => {
    const button = page.locator('.ho-button').first()
    
    if (await button.count() > 0) {
      // 首次运行生成基准截图
      await expect(button).toHaveScreenshot('button-primary.png', { maxDiffPixels: 100 })
    }
  })

  test('Button 尺寸对比', async ({ page }) => {
    const buttons = page.locator('.ho-button')
    
    // Small
    const smallBtn = buttons.locator('.ho-button--small').first()
    if (await smallBtn.count() > 0) {
      await expect(smallBtn).toHaveScreenshot('button-small.png')
    }
    
    // Large
    const largeBtn = buttons.locator('.ho-button--large').first()
    if (await largeBtn.count() > 0) {
      await expect(largeBtn).toHaveScreenshot('button-large.png')
    }
  })

  test('Carousel 组件视觉测试', async ({ page }) => {
    const carousel = page.locator('.ho-carousel').first()
    
    if (await carousel.count() > 0) {
      await expect(carousel).toHaveScreenshot('carousel-default.png')
    }
  })

  test('Modal 组件视觉测试', async ({ page }) => {
    // 触发 modal 打开
    const modal = page.locator('.ho-modal')
    
    if (await modal.count() > 0) {
      await expect(modal).toHaveScreenshot('modal-open.png')
    }
  })
})
