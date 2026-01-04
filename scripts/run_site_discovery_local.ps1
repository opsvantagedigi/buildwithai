# Local wrapper to set placeholder env vars and run discovery
$env:KV_REST_API_URL = 'https://example-kv.local'
$env:KV_REST_API_TOKEN = 'test-token'
$env:ADMIN_DASHBOARD_TOKEN = 'test-admin-token'
$env:KV_HEALTH_URL = 'https://example-kv.local/health'

# Run the existing discovery script (relative path)
& "$PSScriptRoot/run_site_discovery.ps1" -BaseUrl 'https://www.buildwithai.digital'

Write-Host "Local wrapper finished. Environment variables remain in this shell until closed." -ForegroundColor Cyan
Read-Host -Prompt "Press Enter to close this session"