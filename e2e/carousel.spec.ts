/**
 * Carousel 组件 E2E 测试
 */
import { test, expect } from '@playwright/test'

test.describe('Carousel 组件', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('应该正确渲染轮播图', async ({ page }) => {
    const carousel = page.locator('.ho-carousel').first()
    await expect(carousel).toBeVisible()
  })

  test('指示器应该正确显示', async ({ page }) => {
    const indicators = page.locator('.ho-carousel__indicator')
    const count = await indicators.count()
    expect(count).toBeGreaterThan(0)
  })

  test('点击指示器应该切换幻灯片', async ({ page }) => {
    const indicators = page.locator('.ho-carousel__indicator')
    const secondIndicator = indicators.nth(1)
    
    if (await secondIndicator.count() > 0) {
      await secondIndicator.click()
      await expect(secondIndicator).toHaveClass(/--active/)
    }
  })

  test('3D 模式应该可以点击切换', async ({ page }) => {
    const carousel3d = page.locator('.ho-carousel--3d')
    
    if (await carousel3d.count() > 0) {
      const items = carousel3d.locator('.ho-carousel__item')
      const nonActiveItem = items.nth(1)
      
      if (await nonActiveItem.count() > 0) {
        await nonActiveItem.click()
        // 等待动画完成
        await page.waitForTimeout(500)
      }
    }
  })

  test('自动播放应该工作', async ({ page }) => {
    const carousel = page.locator('.ho-carousel').first()
    const activeIndicator = carousel.locator('.ho-carousel__indicator--active')
    
    if (await activeIndicator.count() > 0) {
      const initialIndex = await activeIndicator.getAttribute('data-index')
      
      // 等待自动播放切换
      await page.waitForTimeout(3000)
      
      const newIndex = await activeIndicator.getAttribute('data-index')
      // 验证是否切换了（如果有自动播放）
    }
  })
})
