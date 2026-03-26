$files = Get-ChildItem -Path "c:\Users\aksha\OneDrive\Desktop\george\trinade-new\app" -Recurse -Filter "page.tsx"
foreach ($f in $files) {
    if ($f.FullName -match "layout\.tsx$") { continue }
    $content = Get-Content $f.FullName -Raw
    $content = $content -replace "'https://trinade.com'", "'/'"
    $content = $content -replace "'https://trinade.com/", "'/"
    Set-Content -Path $f.FullName -Value $content -NoNewline -Encoding UTF8
}
