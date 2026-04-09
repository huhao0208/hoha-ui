import type { MarkdownRenderer } from 'vitepress'

/**
 * 自定义 ::: demo 容器插件
 * 用法:
 * ::: demo
 * <template>
 *   <ho-button type="primary">点击我</ho-button>
 * </template>
 * :::
 */
export function demoContainer(md: MarkdownRenderer) {
  const fence = md.renderer.rules.fence!
  
  // 匹配 ::: demo ... :::
  md.block.ruler.before('paragraph', 'demo_container', (state, startLine, endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    
    // 检查是否以 ::: demo 开头
    if (state.src.slice(start, max).trim() !== '::: demo') {
      return false
    }
    
    if (silent) {
      return true
    }
    
    // 查找结束的 :::
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
    
    // 创建 token
    const token = state.push('demo_container', 'div', 0)
    token.content = content.trim()
    token.map = [startLine, nextLine]
    
    state.line = nextLine + 1
    return true
  })
  
  // 渲染 demo 容器
  md.renderer.rules.demo_container = (tokens, idx) => {
    const content = tokens[idx].content
    
    return `<DemoBlock>
<template>
${content}
</template>
<template #code>
${content}
</template>
</DemoBlock>
`
  }
}
