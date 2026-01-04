#!/usr/bin/env node
const fetch = global.fetch || require('node-fetch');
const sodium = require('tweetsodium');

async function main() {
  const repo = process.env.REPO;
  const token = process.env.GH_PAT;
  if (!repo || !token) {
    console.error('Missing REPO or GH_PAT environment variables.');
    console.error('Set REPO=owner/repo and GH_PAT=<personal-access-token> and re-run.');
    process.exit(1);
  }

  const secrets = {
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    ADMIN_DASHBOARD_TOKEN: process.env.ADMIN_DASHBOARD_TOKEN,
    KV_HEALTH_URL: process.env.KV_HEALTH_URL,
  };

  const apiBase = `https://api.github.com/repos/${repo}`;

  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'set-github-secrets-script'
  };

  // Get public key
  const keyRes = await fetch(`${apiBase}/actions/secrets/public-key`, { headers });
  if (!keyRes.ok) {
    console.error('Failed to fetch public key:', keyRes.status, await keyRes.text());
    process.exit(1);
  }
  const key = await keyRes.json();
  // key = { key_id, key }

  for (const [name, value] of Object.entries(secrets)) {
    if (!value) {
      console.log(`Skipping ${name}: no value provided.`);
      continue;
    }

    // Encrypt the secret using the public key
    const messageBytes = Buffer.from(value);
    const keyBytes = Buffer.from(key.key, 'base64');
    const encryptedBytes = sodium.seal(messageBytes, keyBytes);
    const encrypted_value = Buffer.from(encryptedBytes).toString('base64');

    const putRes = await fetch(`${apiBase}/actions/secrets/${name}`, {
      method: 'PUT',
      headers: Object.assign({'Content-Type': 'application/json'}, headers),
      body: JSON.stringify({ encrypted_value, key_id: key.key_id })
    });

    if (!putRes.ok) {
      console.error(`Failed to set secret ${name}:`, putRes.status, await putRes.text());
    } else {
      console.log(`Set secret ${name}`);
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
