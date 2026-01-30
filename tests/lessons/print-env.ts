/**
 * Demo: In các biến môi trường từ GitHub Environments
 * Chạy CI: npx tsx tests/lessons/print-env.ts
 */

import { EnvManager } from '../utils/EnvManager.ts';

console.log('==========================================');
console.log('🔐 BIẾN MÔI TRƯỜNG TỪ GITHUB');
console.log('==========================================');
console.log('');

// Thông tin environment
console.log('🔧 ENVIRONMENT:', EnvManager.get('ENVIRONMENT', 'local'));
console.log('');

// Secrets và Variables từ GitHub Environment
console.log('🔒 SECRETS:');
console.log('   MY_PASSWORD:', EnvManager.get('MY_PASSWORD', '(chưa set)'));
console.log('');

console.log('🌐 VARIABLES:');
console.log('   MY_WEBSITE:', EnvManager.get('MY_WEBSITE', '(chưa set)'));
console.log('');

console.log('==========================================');
console.log('✅ Hoàn tất!');
console.log('==========================================');
