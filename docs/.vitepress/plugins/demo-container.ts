import type { MarkdownRenderer } from 'vitepress'

/**
 * 简化版 Demo 容器 - 直接渲染 Vue 代码块
 */
export function demoContainer(md: MarkdownRenderer) {
  const defaultFence = md.renderer.rules.fence!
  
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    
    // 只处理 vue 代码块
    if (token.info === 'vue') {
      const code = token.content.trim()
      
      return `
<div class="demo-preview">
  ${code}
</div>
<div class="demo-code">
  <details>
    <summary>显示代码</summary>
    <pre><code class="language-vue">${md.utils.escapeHtml(code)}</code></pre>
  </details>
</div>
`
    }
    
    return defaultFence(tokens, idx, options, env, self)
  }
}
