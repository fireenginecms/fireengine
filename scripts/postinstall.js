#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🔥 Thank you for installing FireEngine!');
console.log('');

// Create installation fingerprint
const installPath = path.join(process.cwd(), '.fireengine');
if (!fs.existsSync(installPath)) {
  fs.mkdirSync(installPath, { recursive: true });
}

const installationFile = path.join(installPath, 'installation.json');
if (!fs.existsSync(installationFile)) {
  const installation = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    version: require('../package.json').version,
    node: process.version,
    platform: process.platform,
    arch: process.arch
  };
  
  fs.writeFileSync(installationFile, JSON.stringify(installation, null, 2));
}

console.log('📚 Documentation: https://www.fireengine.dev/docs');
console.log('💳 Purchase a license: https://www.fireengine.dev/#pricing');
console.log('❓ Support: support@fireengine.dev');
console.log('');
console.log('⚡ Get started: Check the examples/ folder for setup instructions');
console.log('');