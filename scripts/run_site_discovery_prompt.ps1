param(
    [string]$BaseUrl = 'https://www.buildwithai.digital'
)

Write-Host "This script will prompt for required KV and admin secrets (input hidden)."

$kvUrl = Read-Host "KV_REST_API_URL (e.g. https://your-kv.example)"
$kvTokenSecure = Read-Host "KV_REST_API_TOKEN (input hidden)" -AsSecureString
$adminTokenSecure = Read-Host "ADMIN_DASHBOARD_TOKEN (input hidden)" -AsSecureString
$kvHealth = Read-Host "KV_HEALTH_URL (e.g. https://your-kv.example/health)"

# Convert secure strings to plain text in memory temporarily
Add-Type -AssemblyName System.Runtime.InteropServices
function ConvertFrom-SecureStringToPlain([System.Security.SecureString]$ss) {
    if ($null -eq $ss) { return $null }
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($ss)
    try { [Runtime.InteropServices.Marshal]::PtrToStringAuto($ptr) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}

$kvToken = ConvertFrom-SecureStringToPlain $kvTokenSecure
$adminToken = ConvertFrom-SecureStringToPlain $adminTokenSecure

# Export to environment for this shell
$env:KV_REST_API_URL = $kvUrl
$env:KV_REST_API_TOKEN = $kvToken
$env:ADMIN_DASHBOARD_TOKEN = $adminToken
$env:KV_HEALTH_URL = $kvHealth

Write-Host "KV environment variables set for this session." -ForegroundColor Green

# Run the discovery script
& "$PSScriptRoot/run_site_discovery.ps1" -BaseUrl $BaseUrl

Write-Host "Discovery run finished. Environment variables remain in this shell until closed." -ForegroundColor Cyan
Read-Host -Prompt "Press Enter to close this session"
