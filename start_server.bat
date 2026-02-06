@echo off
echo Starting Integer Training Website...
echo.

set PHP_BIN=C:\xampp\php\php.exe

if not exist "%PHP_BIN%" (
    echo [ERROR] Could not find PHP at %PHP_BIN%
    echo Checking for other common locations...
    
    if exist "C:\php\php.exe" set PHP_BIN=C:\php\php.exe
    if exist "C:\Program Files\php\php.exe" set PHP_BIN=C:\Program Files\php\php.exe
)

if not exist "%PHP_BIN%" (
    echo [CRITICAL ERROR] PHP executable not found!
    echo Please confirm where you installed XAMPP or PHP.
    pause
    exit /b
)

echo Found PHP at: %PHP_BIN%
echo Starting server at http://127.0.0.1:8000
echo (Press Ctrl+C to stop)
echo.

"%PHP_BIN%" -S 127.0.0.1:8000 -t public

if %errorlevel% neq 0 (
    echo.
    echo [SERVER CRASHED] The server stopped unexpectedly.
    echo This might be because:
    echo 1. Port 8000 is already in use.
    echo 2. There is a configuration error in php.ini.
    echo.
)
pause
