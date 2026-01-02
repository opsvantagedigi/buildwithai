$conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($conn) { $conn | Format-Table -AutoSize } else { Write-Host 'No process listening on port 3000' }