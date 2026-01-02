$paths = @('/docs/getting-started','/api/kv','/api/domains/lookup?name=example.com')
foreach ($p in $paths) {
  $url = 'http://localhost:3000' + $p
  try {
    $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    $status = $res.StatusCode
    $ct = $res.Headers['Content-Type']
    $len = ($res.Content).Length
    Write-Host ("{0} => {1} | {2} | len={3}" -f $p, $status, $ct, $len)
    if ($status -ge 400) {
      $snippet = $res.Content
      if ($snippet.Length -gt 1000) { $snippet = $snippet.Substring(0,1000) }
      Write-Host '--- RESPONSE SNIPPET ---'
      Write-Host $snippet
    }
  } catch {
    Write-Host ("{0} => ERROR: {1}" -f $p, $_.Exception.Message)
  }
}
# Stop the local server listening on port 3000
try {
  $conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
  if ($conn) {
    $pid = $conn.OwningProcess
    if ($pid) {
      Write-Host "Stopping process $pid listening on port 3000"
      Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
  }
} catch {
  Write-Host 'Could not stop local server process automatically.'
}
