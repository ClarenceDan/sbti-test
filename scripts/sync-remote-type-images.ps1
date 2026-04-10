$ErrorActionPreference = 'Stop'

$destination = Join-Path $PSScriptRoot '..\\public\\types'
$resolvedDestination = Resolve-Path (New-Item -ItemType Directory -Force -Path $destination)
$baseUrl = 'https://sbti-test.com/types'
$files = @(
  'IMSB',
  'BOSS',
  'MUM',
  'FAKE',
  'Dior-s',
  'DEAD',
  'ZZZZ',
  'GOGO',
  'FUCK',
  'CTRL',
  'HHHH',
  'SEXY',
  'OJBK',
  'JOKE-R',
  'POOR',
  'OH-NO',
  'MONK',
  'SHIT',
  'THAN-K',
  'MALO',
  'ATM-er',
  'THIN-K',
  'SOLO',
  'LOVE-R',
  'WOC',
  'DRUNK',
  'IMFW'
)

foreach ($file in $files) {
  $target = Join-Path $resolvedDestination "$file.png"
  Write-Host "Downloading $file.png"
  curl.exe -L -s "$baseUrl/$file.png" -o $target
  if (!(Test-Path $target)) {
    throw "Failed to download $file.png"
  }
}

Write-Host "Synced $($files.Count) type images to $resolvedDestination"
