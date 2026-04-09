import type { MarkdownRenderer } from 'vitepress'

/**
 * Demo 容器插件
 * 将 ::: demo ... ::: 转换为带有代码和预览的容器
 */

interface ContainerOpts {
  marker?: string
  validate?: (params: string) => boolean
  render?: (tokens: any[], idx: number, options: any, env: any, self: any) => string
}

export function demoPlugin(md: MarkdownRenderer) {
  // 使用 markdown-it-container
  const container = require('markdown-it-container')
  
  md.use(container, 'demo', {
    validate(params: string) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    
    render(tokens: any[], idx: number) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      
      if (tokens[idx].nesting === 1) {
        // 开始标签
        return `<div class="demo-container">
<div class="demo-preview">
`
      } else {
        // 结束标签
        return `</div>
</div>
`
      }
    }
  } as ContainerOpts)
}
