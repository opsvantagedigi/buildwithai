$attempts=0
while ($attempts -lt 30) {
  $conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
  if ($conn) { Write-Host 'Port 3000 is listening'; exit 0 }
  Start-Sleep -Seconds 1
  $attempts++
}
Write-Host 'Port 3000 did not become available'
exit 1
