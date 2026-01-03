$base = 'https://buildwithairedesign-dkz1gvbc1-ajay-sidals-projects-132aa3d1.vercel.app'
$adminToken = $env:ADMIN_DASHBOARD_TOKEN

if (-not $adminToken) {
  Write-Error "ADMIN_DASHBOARD_TOKEN environment variable is not set."
  exit 1
}

for ($i = 1; $i -le 5; $i++) {
  try {
    $r = Invoke-RestMethod -Uri "$base/api/debug/kv" -Method GET -TimeoutSec 30 -Headers @{ 'x-admin-token' = $adminToken }
    $r | ConvertTo-Json -Depth 5
  } catch {
    Write-Output "ERROR: $_"
  }

  Start-Sleep -Milliseconds 200
}
