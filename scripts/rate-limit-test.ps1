$base = "https://buildwithairedesign-dkz1gvbc1-ajay-sidals-projects-132aa3d1.vercel.app"
$endpoints = @(
  "/api/domain/info?name=example.com",
  "/api/domain/rdap?name=example.com",
  "/api/domain/pricing?name=example.com"
)
$iterations = 70
$delayMs = 100

foreach ($ep in $endpoints) {
  Write-Output "=== Testing $ep ==="
  $counts = @{}
  for ($i=1; $i -le $iterations; $i++) {
    $status = 'ERR'
    $body = ''
    try {
      $nonce = [DateTime]::UtcNow.Ticks.ToString() + "-" + $i
      $url = $base + $ep + "&_=" + $nonce
      $resp = Invoke-WebRequest -Uri $url -Method GET -UseBasicParsing -Headers @{ Accept = 'application/json' } -TimeoutSec 30
      if ($resp.StatusCode -ne $null) { $status = $resp.StatusCode }
      else { $status = 200 }
    } catch [System.Net.WebException] {
      $r = $_.Exception.Response
      if ($r -ne $null) {
        $status = $r.StatusCode.Value__
        $body = (New-Object System.IO.StreamReader($r.GetResponseStream())).ReadToEnd()
      } else {
        $status = 'ERR'
        $body = $_.Exception.Message
      }
    } catch {
      $status = 'ERR'
      $body = $_.Exception.Message
    }

    if (-not $counts.ContainsKey($status)) { $counts[$status] = 0 }
    $counts[$status] += 1

    Write-Output "$i => $status"
    if ($status -eq 429) {
      Write-Output "--- Response body (truncated):"
      if ($body.Length -gt 400) { Write-Output ($body.Substring(0,400) + '...') } else { Write-Output $body }
      break
    }

    Start-Sleep -Milliseconds $delayMs
  }

  Write-Output "Summary for $ep"
  $counts.GetEnumerator() | Sort-Object Name | ForEach-Object { Write-Output "$($_.Name): $($_.Value)" }
  Write-Output "`n"
}
