import type { MarkdownRenderer } from 'vitepress'

/**
 * Demo Preview 插件 - 不处理，让客户端 JS 处理
 */
export function demoPlugin(md: MarkdownRenderer) {
  // 不做任何处理，保持原始 HTML
}
