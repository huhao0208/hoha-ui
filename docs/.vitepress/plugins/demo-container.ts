import type { MarkdownRenderer } from 'vitepress'

/**
 * H5 Preview 容器 - iframe 隔离 + rem 适配
 */
export function demoContainer(md: MarkdownRenderer) {
  const defaultFence = md.renderer.rules.fence!
  
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    
    // 只处理 vue 代码块
    if (token.info === 'vue') {
      const code = token.content.trim()
      const html = extractTemplate(code)
      
      return createH5Preview(html, code)
    }
    
    return defaultFence(tokens, idx, options, env, self)
  }
}

/**
 * 从 Vue SFC 提取 template 内容
 */
function extractTemplate(code: string): string {
  const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/)
  if (templateMatch) {
    return templateMatch[1].trim()
  }
  return code
}

/**
 * 创建 H5 预览 HTML
 */
function createH5Preview(html: string, code: string): string {
  const escapedCode = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
  
  // iframe 内容 - 包含 rem 适配脚本
  const iframeContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <script>
    (function() {
      // 监听父窗口传递的 fontSize 设置
      window.addEventListener('message', function(e) {
        if (e.data && e.data.type === 'setFontSize') {
          document.documentElement.style.fontSize = e.data.fontSize + 'px';
        }
      });
      // 默认 375px 宽度 → 18.75px
      document.documentElement.style.fontSize = '18.75px';
    })();
  </script>
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
      --hoho-text-tertiary: #6b7280;
      --hoho-bg-primary: #ffffff;
      --hoho-bg-secondary: #f3f4f6;
      --hoho-border-color: #e5e7eb;
      --hoho-radius-sm: 0.25rem;
      --hoho-radius-md: 0.5rem;
      --hoho-radius-lg: 0.75rem;
      --hoho-spacing-xs: 0.125rem;
      --hoho-spacing-sm: 0.25rem;
      --hoho-spacing-md: 0.5rem;
    }
    
    @media (prefers-color-scheme: dark) {
      :root {
        --hoho-text-primary: #f3f4f6;
        --hoho-text-secondary: #d1d5db;
        --hoho-bg-primary: #1f2937;
        --hoho-bg-secondary: #111827;
        --hoho-border-color: #374151;
      }
      body { background: #1f2937; color: #f3f4f6; }
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 0.4rem;
      line-height: 1.5;
      background: var(--hoho-bg-primary);
      color: var(--hoho-text-primary);
    }
    
    .preview-content { padding: 0.5rem; }
  </style>
</head>
<body>
  <div class="preview-content">${html}</div>
</body>
</html>
`
  
  const encodedContent = Buffer.from(iframeContent).toString('base64')
  
  return `
<div class="h5-preview-container">
  <div class="h5-device">
    <div class="h5-device__notch"></div>
    <iframe class="h5-device__screen" src="data:text/html;base64,${encodedContent}" sandbox="allow-scripts"></iframe>
  </div>
  <div class="h5-controls">
    <label>rem基准: <input type="range" min="12" max="50" value="18.75" class="h5-rem-slider"> <span class="h5-rem-value">18.75px</span></label>
  </div>
  <details class="h5-code"><summary>显示代码</summary><pre><code class="language-vue">${escapedCode}</code></pre></details>
</div>
`
}
