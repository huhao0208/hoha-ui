#!/usr/bin/env node
/**
 * 从 Vue 组件自动生成 API 文档
 * 使用 vue-docgen-api 解析组件
 */

const fs = require('fs')
const path = require('path')
const { parse } = require('vue-docgen-api')

const COMPONENTS_DIR = path.join(__dirname, '../packages/components/src')
const DOCS_DIR = path.join(__dirname, '../docs/components')

// 组件列表
const components = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .filter(name => {
    const indexPath = path.join(COMPONENTS_DIR, name, 'index.vue')
    const tsPath = path.join(COMPONENTS_DIR, name, 'index.ts')
    return fs.existsSync(indexPath) || fs.existsSync(tsPath)
  })

console.log('Generating docs for components:', components)

async function generateDoc(componentName) {
  const componentPath = path.join(COMPONENTS_DIR, componentName, 'index.vue')
  
  if (!fs.existsSync(componentPath)) {
    console.log(`Skipping ${componentName}: no index.vue`)
    return
  }

  try {
    const doc = await parse(componentPath)
    
    let md = `# ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} ${getChineseName(componentName)}\n\n`
    
    // 描述
    if (doc.description) {
      md += `${doc.description}\n\n`
    }
    
    // Props
    if (doc.props && doc.props.length > 0) {
      md += `## Props\n\n`
      md += `| 属性名 | 说明 | 类型 | 默认值 |\n`
      md += `| ------ | ---- | ---- | ------ |\n`
      
      for (const prop of doc.props) {
        const name = prop.name
        const description = prop.description || '-'
        const type = prop.type?.name || 'any'
        const defaultValue = prop.defaultValue?.value || '-'
        
        md += `| ${name} | ${description} | \`${type}\` | ${defaultValue} |\n`
      }
      md += '\n'
    }
    
    // Events
    if (doc.events && doc.events.length > 0) {
      md += `## Events\n\n`
      md += `| 事件名 | 说明 | 参数 |\n`
      md += `| ------ | ---- | ---- |\n`
      
      for (const event of doc.events) {
        const name = event.name
        const description = event.description || '-'
        const args = event.type?.names?.join(', ') || '-'
        
        md += `| ${name} | ${description} | \`${args}\` |\n`
      }
      md += '\n'
    }
    
    // Slots
    if (doc.slots && doc.slots.length > 0) {
      md += `## Slots\n\n`
      md += `| 插槽名 | 说明 |\n`
      md += `| ------ | ---- |\n`
      
      for (const slot of doc.slots) {
        const name = slot.name
        const description = slot.description || '-'
        
        md += `| ${name} | ${description} |\n`
      }
      md += '\n'
    }
    
    // Methods
    if (doc.methods && doc.methods.length > 0) {
      md += `## Methods\n\n`
      md += `| 方法名 | 说明 | 参数 |\n`
      md += `| ------ | ---- | ---- |\n`
      
      for (const method of doc.methods) {
        const name = method.name
        const description = method.description || '-'
        const args = method.params?.map(p => p.name).join(', ') || '-'
        
        md += `| ${name} | ${description} | \`${args}\` |\n`
      }
      md += '\n'
    }
    
    // 写入文件
    const docPath = path.join(DOCS_DIR, `${componentName}-api.md`)
    fs.writeFileSync(docPath, md)
    console.log(`✅ Generated: ${componentName}-api.md`)
    
  } catch (err) {
    console.error(`❌ Error parsing ${componentName}:`, err.message)
  }
}

function getChineseName(name) {
  const names = {
    button: '按钮',
    input: '输入框',
    modal: '模态框',
    icon: '图标',
    image: '图片',
    carousel: '轮播图',
    tabs: '标签页',
    navbar: '导航栏',
    tabbar: '底部导航',
    'tabbar-item': '底部导航项',
    cell: '单元格',
    'cell-group': '单元格组',
    message: '消息提示',
    toast: '轻提示'
  }
  return names[name] || ''
}

async function main() {
  for (const component of components) {
    await generateDoc(component)
  }
  console.log('\nDone!')
}

main()
