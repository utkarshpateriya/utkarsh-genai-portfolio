# Load environment variables from .env
Write-Host "`nLoading environment variables..." -ForegroundColor Cyan

Get-Content .env | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [Environment]::SetEnvironmentVariable($name, $value, 'Process')
        Write-Host "  $name" -ForegroundColor Green
    }
}

Write-Host "`nStarting Claude Code...`n" -ForegroundColor Cyan

# Start Claude Code
claude
