import type { MarkdownRenderer } from 'vitepress'

/**
 * 简化版 demo 容器 - 直接渲染为可展开的代码块
 */
export function demoContainer(md: MarkdownRenderer) {
  // 匹配 ::: demo ... :::
  md.block.ruler.before('paragraph', 'demo_container', (state, startLine, endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    
    if (state.src.slice(start, max).trim() !== '::: demo') {
      return false
    }
    
    if (silent) {
      return true
    }
    
    let nextLine = startLine + 1
    let content = ''
    
    while (nextLine < endLine) {
      const lineStart = state.bMarks[nextLine] + state.tShift[nextLine]
      const lineMax = state.eMarks[nextLine]
      const line = state.src.slice(lineStart, lineMax)
      
      if (line.trim() === ':::') {
        break
      }
      
      content += line + '\n'
      nextLine++
    }
    
    // 创建一个代码块 token
    const token = state.push('fence', 'code', 0)
    token.info = 'vue'
    token.content = content.trim()
    token.map = [startLine, nextLine]
    
    state.line = nextLine + 1
    return true
  })
}
