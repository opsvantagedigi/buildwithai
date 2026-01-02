# Stop any process listening on port 3000
$conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($conn) {
  $ownPid = $conn.OwningProcess
  Write-Host "Stopping existing process $ownPid"
  Stop-Process -Id $ownPid -Force -ErrorAction SilentlyContinue
  Start-Sleep -Seconds 1
}
# Start Next.js with output redirected to server.log
$outLog = Join-Path (Get-Location) 'server-out.log'
$errLog = Join-Path (Get-Location) 'server-err.log'
if (Test-Path $outLog) { Remove-Item $outLog -Force }
if (Test-Path $errLog) { Remove-Item $errLog -Force }
$p = Start-Process -FilePath 'cmd' -ArgumentList '/c','npx next start' -RedirectStandardOutput $outLog -RedirectStandardError $errLog -PassThru
Write-Host "Started process $($p.Id), logging to $outLog and $errLog"
# Wait for port
$attempts=0
$ready=$false
while ($attempts -lt 30) {
  $c = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
  if ($c) { $ready = $true; break }
  Start-Sleep -Seconds 1
  $attempts++
}
if (-not $ready) { Write-Host 'Server did not start within timeout'; exit 1 }
# Hit the docs route to generate server logs
try {
  $res = Invoke-WebRequest -Uri 'http://localhost:3000/docs/getting-started' -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
  Write-Host "/docs/getting-started => $($res.StatusCode)"
} catch {
  Write-Host "/docs/getting-started => ERROR: $($_.Exception.Message)"
}
Start-Sleep -Seconds 1
Write-Host '--- Last 200 lines of server.log ---'
Write-Host '--- Last 200 lines of server-out.log ---'
Get-Content $outLog -Tail 200 | ForEach-Object { Write-Host $_ }
Write-Host '--- Last 200 lines of server-err.log ---'
Get-Content $errLog -Tail 200 | ForEach-Object { Write-Host $_ }
# Stop server
try {
  $c = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
  if ($c) { Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue; Write-Host "Stopped process $($c.OwningProcess)" }
} catch { Write-Host 'Failed to stop server process' }
