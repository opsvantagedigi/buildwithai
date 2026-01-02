$cwd = (Get-Location).Path
$file = Join-Path $cwd '.env.development.local'
if (-not (Test-Path $file)) {
    Write-Host "No .env.development.local found at $file"
    exit 1
}
$lines = Get-Content $file
$pairs = @()
foreach ($line in $lines) {
    if (-not $line) { continue }
    if ($line.TrimStart().StartsWith('#')) { continue }
    if ($line -match '^\s*([^=]+)\s*=\s*(.*)$') {
        $n = $matches[1].Trim()
        $v = $matches[2].Trim()
        if ($v.StartsWith('"') -and $v.EndsWith('"')) { $v = $v.Substring(1,$v.Length-2) }
        $pairs += [PSCustomObject]@{ Name = $n; Value = $v }
    }
}
if (-not $pairs) { Write-Host 'No variables found to upload.'; exit 0 }
foreach ($p in $pairs) {
    if ($p.Value -ne '') {
        foreach ($env in @('development','preview','production')) {
            Write-Host '---'
            Write-Host "Adding $($p.Name) to $env..."
            try {
                $p.Value | vercel env add $($p.Name) $env
            } catch {
                Write-Host ([string]::Format('Error adding {0} to {1}: {2}', $p.Name, $env, $_))
            }
        }
    } else {
        Write-Host "Skipping $($p.Name) because value is empty"
    }
}
Write-Host 'Done.'
