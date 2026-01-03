const fs = require('fs');
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const siteId = args[0];
if (!siteId) {
  console.error('Usage: node scripts/run-test-publish.js <siteId>');
  process.exit(1);
}

const envPath = '.env.development.local';
if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, 'utf8');
  raw.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([^#=\s]+)=\s*(.*)$/);
    if (m) {
      let v = m[2];
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      process.env[m[1]] = v;
    }
  });
}

// Diagnostic: print the KV-related envs we just loaded for confirmation
console.log('Loaded KV envs: KV_REST_API_URL=', process.env.KV_REST_API_URL ? '[present]' : '[missing]', 'KV_REST_API_TOKEN=', process.env.KV_REST_API_TOKEN ? '[present]' : '[missing]');
console.log('Loaded Upstash envs: UPSTASH_REDIS_REST_URL=', process.env.UPSTASH_REDIS_REST_URL ? '[present]' : '[missing]', 'UPSTASH_REDIS_REST_TOKEN=', process.env.UPSTASH_REDIS_REST_TOKEN ? '[present]' : '[missing]');
console.log('Running test-publish with siteId:', siteId);
const res = spawnSync('npx', ['tsx', 'scripts/test-publish.ts', siteId], { stdio: 'inherit', env: process.env });
process.exit(res.status);
