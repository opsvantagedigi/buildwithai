# scripts/run_site_discovery.ps1
# Run site discovery, create a landing site if none exist, then run publish test

$ErrorActionPreference = 'Stop'

# Ensure base URL
$env:NEXT_PUBLIC_BASE_URL = 'http://localhost:3000'

Write-Output "Using NEXT_PUBLIC_BASE_URL=$env:NEXT_PUBLIC_BASE_URL"

# 1) List sites
Write-Output "Fetching /api/sites..."
try {
  $resp = Invoke-RestMethod -Uri "$env:NEXT_PUBLIC_BASE_URL/api/sites" -Method GET -ErrorAction Stop
} catch {
  Write-Output "Failed to fetch /api/sites: $_"
  exit 1
}

$siteId = $null

# Normalize response to array of sites
if ($null -eq $resp) {
  $sites = @()
} elseif ($resp -and $resp.sites) {
  $sites = $resp.sites
} elseif ($resp -is [System.Array]) {
  $sites = $resp
} else {
  $sites = @()
}

if ($sites.Count -eq 0) {
  Write-Output "No sites found. Creating new site from template 'landing'..."
  $out = curl.exe -v "http://localhost:3000/api/templates/create?templateId=landing" 2>&1
  Write-Output "Raw curl output:"; $out
  $loc = ($out | Where-Object { $_ -match 'Location:' } | Select-Object -Last 1)
  if ($loc) {
    $locUrl = $loc -replace '.*Location:\s*',''
    $newId = ($locUrl.Trim() -split '/')[-1]
    Write-Output "Location header extracted: $locUrl"
    Write-Output "New siteId: $newId"
    $siteId = $newId
  } else {
    Write-Output "Failed to extract Location header from curl output; aborting."
    exit 2
  }
} else {
  Write-Output "Existing sites:"
  foreach ($s in $sites) { Write-Output ("{0} {1}" -f $s.id, ($s.name -as [string])) }
  $siteId = $sites[0].id
  Write-Output "Using siteId: $siteId"
}

if (-not $siteId) {
  Write-Output "No siteId available; aborting."
  exit 3
}

Write-Output "Running publish test for siteId: $siteId"

# Run the test script
& npx tsx scripts/test-publish.ts $siteId

$exitCode = $LASTEXITCODE
Write-Output "Publish test exited with code: $exitCode"
exit $exitCode
