$repo='opsvantagedigi/buildwithai'
$file='.env.local'
if (-not (Test-Path $file)) { Write-Host 'ERROR: .env.local not found'; exit 2 }
function Get-EnvVal($k){
  $m = Select-String -Path $file -Pattern "^\s*${k}\s*=\s*" | Select-Object -First 1
  if (-not $m) { return $null }
  $line = $m.Line
  $val = $line -replace "^\s*${k}\s*=\s*", ''
  $val = $val.Trim()
  if ($val.StartsWith('"') -and $val.EndsWith('"')) { $val = $val.Substring(1,$val.Length-2) }
  return $val
}
$keys = @('KV_REST_API_URL','KV_REST_API_TOKEN','KV_HEALTH_URL','ADMIN_DASHBOARD_TOKEN')
foreach ($k in $keys) {
  $v = Get-EnvVal $k
  if (-not $v) { Write-Host "MISSING:$k"; continue }
  Write-Host "Setting secret: $k"
  gh secret set $k --body "$v" --repo $repo
  if ($LASTEXITCODE -ne 0) { Write-Host "FAILED:$k"; exit 1 }
  Write-Host "SET:$k"
}
