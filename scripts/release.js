#!/usr/bin/env node

/**
 * Release script for hoha-ui monorepo
 * This script is used by changesets to publish packages
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting release process...\n');

try {
  // Build all packages before publishing
  console.log('📦 Building all packages...');
  execSync('pnpm build', { stdio: 'inherit' });
  console.log('✅ Build completed\n');

  // Publish using changesets
  console.log('📤 Publishing packages...');
  execSync('pnpm changeset publish', { stdio: 'inherit' });
  console.log('✅ Publish completed\n');

  console.log('🎉 Release successful!');
} catch (error) {
  console.error('❌ Release failed:', error.message);
  process.exit(1);
}
