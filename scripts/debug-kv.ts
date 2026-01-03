import fs from 'fs'

// Load .env.development.local into process.env
const envPath = '.env.development.local'
if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, 'utf8')
  raw.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([^#=\s]+)=\s*(.*)$/)
    if (m) {
      let v = m[2]
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1)
      process.env[m[1]] = v
    }
  })
}

;(async () => {
  try {
    const mod = await import('../src/lib/kv')
    const res = await mod.debugKvRoundTrip()
    console.log('ROUNDTRIP_RESULT', JSON.stringify(res))
    process.exit(0)
  } catch (e) {
    console.error('ROUNDTRIP_ERROR', e)
    process.exit(2)
  }
})()
