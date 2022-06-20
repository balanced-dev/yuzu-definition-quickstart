Write-Output "`n"
Write-Output "Copying files to delivery app"

Remove-Item -Recurse -Force ..\delivery.src\{ProjectName}\_client
Remove-Item -Recurse -Force ..\delivery.src\{ProjectName}\_templates
Remove-Item -Recurse -Force ..\delivery.src\{ProjectName}\yuzu-def-ui

xcopy /s /q /y dist ..\\delivery.src\\{ProjectName}

Write-Output "`n"

Write-Output "Updating Master Views with new script references"

function Update-Script {

    param (
        $FilePattern,
        $ViewPath
    )

    $NewFilename = Get-ChildItem -Path $path -Force -Filter $FilePattern -Recurse -File | Select-Object -First 1
    
    (Get-Content $ViewPath -raw) -Replace $FilePattern, $NewFilename.Name | Set-Content $ViewPath

    Write-Output "$($FilePattern) file pattern written to $($ViewPath)"

}

Update-Script -FilePattern 'scripts.*js' -ViewPath '..\delivery.src\{ProjectName}\Views\master.cshtml'
Update-Script -FilePattern 'styles.*css' -ViewPath '..\delivery.src\{ProjectName}\Views\master.cshtml'
