// scripts/set-env.js
const fs = require('fs');
const path = require('path');

const envType = process.argv[2]; // 'stage' or 'prod'
const envFileMap = {
  stage: '.env.stage',
  prod: '.env.prod',
  local: '.env.dev'
};

const sourceEnvFile = envFileMap[envType];
if (!sourceEnvFile) {
  console.error(`❌ Unknown environment: ${envType}`);
  process.exit(1);
}

const srcPath = path.join(__dirname, '.', sourceEnvFile);
const destPath = path.join(__dirname, '.', '.env');

try {
  fs.copyFileSync(srcPath, destPath);
  console.log(`✅ Copied ${sourceEnvFile} to .env`);
} catch (err) {
  console.error(`❌ Failed to copy ${sourceEnvFile} to .env:`, err.message);
  process.exit(1);
}
