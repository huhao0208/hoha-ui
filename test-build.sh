#!/bin/bash

echo "=== 测试 @hoha/shared 包 ==="
cd /root/.openclaw/projects/hoha-ui/packages/shared/dist
echo "测试 ESM 导入："
node -e "
import('./index.esm.js').then(m => {
  console.log('VERSION:', m.VERSION);
  console.log('COMPONENT_NAME_PREFIX:', m.COMPONENT_NAME_PREFIX);
  console.log('sizeMap:', m.sizeMap);
  console.log('✓ ESM 导入测试通过');
}).catch(e => {
  console.error('✗ ESM 导入测试失败:', e);
  process.exit(1);
});
"
echo ""
echo "测试 CJS 导入："
node -e "
const m = require('./index.cjs.js');
console.log('VERSION:', m.VERSION);
console.log('COMPONENT_NAME_PREFIX:', m.COMPONENT_NAME_PREFIX);
console.log('sizeMap:', m.sizeMap);
console.log('✓ CJS 导入测试通过');
"

echo ""
echo "=== 测试 @hoha/utils 包 ==="
cd /root/.openclaw/projects/hoha-ui/packages/utils/dist
echo "测试 ESM 导入："
node -e "
import('./index.esm.js').then(m => {
  console.log('deepClone:', typeof m.deepClone);
  console.log('debounce:', typeof m.debounce);
  console.log('throttle:', typeof m.throttle);
  console.log('✓ ESM 导入测试通过');
}).catch(e => {
  console.error('✗ ESM 导入测试失败:', e);
  process.exit(1);
});
"
echo ""
echo "测试 CJS 导入："
node -e "
const m = require('./index.cjs.js');
console.log('deepClone:', typeof m.deepClone);
console.log('debounce:', typeof m.debounce);
console.log('throttle:', typeof m.throttle);
console.log('✓ CJS 导入测试通过');
"
echo ""
echo "测试 UMD 导入："
node -e "
const m = require('./index.umd.js');
console.log('HohaUtils:', typeof HohaUtils);
console.log('deepClone:', typeof HohaUtils.deepClone);
console.log('✓ UMD 导入测试通过');
"

echo ""
echo "=== 测试 @hoha/components 包 ==="
cd /root/.openclaw/projects/hoha-ui/packages/components/dist
echo "检查文件："
ls -lh index.esm.js index.cjs.js index.umd.js style.css index.d.ts
echo ""
echo "检查 CSS 文件内容："
head -20 style.css

echo ""
echo "=== 所有测试完成 ==="
