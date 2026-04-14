import type { MarkdownRenderer } from 'vitepress'

/**
 * H5 Preview - 将 .demo-preview 转换为 iframe
 */
export function demoPlugin(md: MarkdownRenderer) {
  // 自定义容器渲染
  const defaultRender = md.renderer.rules.html_block!
  
  md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const content = token.content
    
    // 检测是否是 demo-preview 容器
    if (content.includes('class="demo-preview"') || content.includes("class='demo-preview'")) {
      // 提取内部 HTML
      const match = content.match(/<div[^>]*class=["']demo-preview["'][^>]*>([\s\S]*?)<\/div>/i)
      if (match) {
        const innerHtml = match[1].trim()
        return createIframePreview(innerHtml)
      }
    }
    
    return defaultRender(tokens, idx, options, env, self)
  }
  
  // 处理 html_inline（单行 HTML）
  const defaultInlineRender = md.renderer.rules.html_inline!
  md.renderer.rules.html_inline = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const content = token.content
    
    if (content.includes('class="demo-preview"') || content.includes("class='demo-preview'")) {
      const match = content.match(/<div[^>]*class=["']demo-preview["'][^>]*>([\s\S]*?)<\/div>/i)
      if (match) {
        return createIframePreview(match[1].trim())
      }
    }
    
    return defaultInlineRender(tokens, idx, options, env, self)
  }
}

function createIframePreview(html: string): string {
  const iframeContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --hoho-color-primary: #3b82f6;
      --hoho-color-success: #10b981;
      --hoho-color-warning: #f59e0b;
      --hoho-color-danger: #ef4444;
      --hoho-color-info: #06b6d4;
      --hoho-color-secondary: #6b7280;
      --hoho-text-primary: #1f2937;
      --hoho-text-secondary: #4b5563;
      --hoho-bg-primary: #ffffff;
      --hoho-bg-secondary: #f3f4f6;
      --hoho-border-color: #e5e7eb;
      --hoho-radius-sm: 0.25rem;
      --hoho-radius-md: 0.5rem;
      --hoho-radius-lg: 0.75rem;
      --hoho-spacing-sm: 0.25rem;
      --hoho-spacing-md: 0.5rem;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --hoho-text-primary: #f3f4f6;
        --hoho-bg-primary: #1f2937;
        --hoho-border-color: #374151;
      }
      body { background: #1f2937; }
    }
    html { font-size: 18.75px; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 0.4rem;
      line-height: 1.5;
      background: var(--hoho-bg-primary);
      color: var(--hoho-text-primary);
    }
    .content {
      padding: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      align-items: center;
    }
  </style>
</head>
<body><div class="content">${html}</div></body>
</html>
`
  const encoded = Buffer.from(iframeContent).toString('base64')
  
  return `
<div class="h5-preview-container" data-rem="18.75">
  <div class="h5-device">
    <div class="h5-device__notch"></div>
    <iframe class="h5-device__screen" src="data:text/html;base64,${encoded}" sandbox="allow-scripts"></iframe>
  </div>
  <div class="h5-controls">
    <label>rem基准: <input type="range" min="12" max="50" value="18.75" class="h5-rem-slider"> <span class="h5-rem-value">18.75px</span></label>
  </div>
</div>
`
}

export function setupH5Controls() {
  if (typeof document === 'undefined') return
  
  document.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement
    if (!target.classList.contains('h5-rem-slider')) return
    
    const container = target.closest('.h5-preview-container')
    const iframe = container?.querySelector('.h5-device__screen') as HTMLIFrameElement
    const valueEl = container?.querySelector('.h5-rem-value')
    const fontSize = parseFloat(target.value)
    
    if (valueEl) valueEl.textContent = fontSize + 'px'
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'setFontSize', fontSize }, '*')
    }
  })
}
