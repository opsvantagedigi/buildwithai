$p = Start-Process -FilePath 'cmd' -ArgumentList '/c','npm run start' -WindowStyle Hidden -PassThru
Write-Host "Started PID $($p.Id)"
Start-Sleep -Seconds 3
