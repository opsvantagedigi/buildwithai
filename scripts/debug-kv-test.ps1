$base = 'https://buildwithairedesign-lqx336spi-ajay-sidals-projects-132aa3d1.vercel.app'
for ($i=1; $i -le 5; $i++) {
  try {
    $r = Invoke-RestMethod -Uri "$base/api/debug/kv" -Method GET -TimeoutSec 30
    $r | ConvertTo-Json -Depth 5
  } catch {
    Write-Output "ERROR: $_"
  }
  Start-Sleep -Milliseconds 200
}
