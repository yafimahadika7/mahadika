@echo off
echo =======================================
echo Menjalankan Git Automation
echo =======================================

REM Git Add
echo Menambahkan file ke stage...
git add .
if %errorlevel% neq 0 (
    echo Terjadi kesalahan saat git add.
    pause
    exit /b %errorlevel%
)

REM Git Commit
set /p commitMessage=Masukkan pesan commit: 
git commit -m "%commitMessage%"
if %errorlevel% neq 0 (
    echo Terjadi kesalahan saat git commit.
    pause
    exit /b %errorlevel%
)

REM Git Push
echo Mendorong perubahan ke branch 'main'...
git push origin main
if %errorlevel% neq 0 (
    echo Terjadi kesalahan saat git push.
    pause
    exit /b %errorlevel%
)

echo Operasi berhasil diselesaikan!
pause
