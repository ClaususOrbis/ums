# Enable TLSv1.2 for compatibility with older clients
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor [System.Net.SecurityProtocolType]::Tls12

$DownloadEXE = 'https://github.com/ClaususOrbis/ums/releases/download/0.56.2/SEU.UMS.0.56.2.exe'
$DownloadBAT = 'https://claususorbis.github.io/ums/shortcut.bat'
$DownloadICON = 'https://claususorbis.github.io/ums/ums.ico'

$folderPath = "$env:ProgramData\UMS"
if (-not (Test-Path -Path $folderPath)) {
    New-Item -Path $folderPath -ItemType Directory
}

Stop-Process -Name "ums" -Force -ErrorAction SilentlyContinue
Stop-Process -Name "SEU UMS" -Force -ErrorAction SilentlyContinue

$ExePath = "$folderPath\ums.exe"
$BatPath = "$folderPath\ums.bat"
$IconPath = "$folderPath\ums.ico"
$ShortcutPath = "$folderPath\create_shortcuts.vbs"

if (Test-Path $ExePath) {
    $item = Get-Item -LiteralPath $ExePath
    $item.Delete()
}
if (Test-Path $BatPath) {
    $item = Get-Item -LiteralPath $BatPath
    $item.Delete()
}
if (Test-Path $IconPath) {
    $item = Get-Item -LiteralPath $IconPath
    $item.Delete()
}

try {
    Invoke-WebRequest -Uri $DownloadICON -UseBasicParsing -OutFile $IconPath
    Invoke-WebRequest -Uri $DownloadBAT -UseBasicParsing -OutFile $BatPath
    Invoke-WebRequest -Uri $DownloadEXE -UseBasicParsing -OutFile $ExePath
} catch {
    Write-Error $_
    Return
}

if (Test-Path $BatPath) {
    Start-Process $BatPath -Wait
	
    $item = Get-Item -LiteralPath $BatPath
    $item.Delete()

    $item = Get-Item -LiteralPath $ShortcutPath
    $item.Delete()
}

Write-Host ""
Write-Host "UMS Desktop App for Windows was successfully installed." -f green
Write-Host ""
Write-Host "You can find it on your Desktop and Start Menu." -f cyan
Write-Host ""
