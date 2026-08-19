@echo off
setlocal
title MediCheck Korea

rem ============================================================
rem MediCheck Korea - stage 1 screens (Java + React + SQLite).
rem The plan is in docs\01-...html through docs\07-...html next to this file.
rem
rem   start-server.bat                 home
rem   start-server.bat find            Find a hospital
rem   start-server.bat certification   About certification
rem   start-server.bat journey         Patient journey
rem   start-server.bat consultation    Online consultation
rem   start-server.bat price           Check the price
rem   start-server.bat inquiry         Send an inquiry
rem   start-server.bat --no-browser    start without opening a browser
rem   start-server.bat --no-build      skip the frontend bundle step
rem
rem Keep this file ASCII-only with CRLF line endings.
rem ============================================================

set "PORT=8081"
if defined MEDICHECK_PORT set "PORT=%MEDICHECK_PORT%"
set "MEDICHECK_PORT=%PORT%"
set "HOST=127.0.0.1"
set "ROOT=%~dp0"
set "APP=%ROOT%app"

rem The browser waiter re-enters this file. It has to come after PORT and HOST
rem are known and before anything that builds or binds.
if /i "%~1"=="--wait-and-open" goto waitopen

rem Absolute on purpose. The default in application.properties is relative, so
rem it would follow whatever folder the launcher happened to be started from -
rem double-clicking from Explorer and running from a terminal would then use
rem two different database files without saying so.
if not defined MEDICHECK_DB set "MEDICHECK_DB=%APP%\data\medicheck.db"

rem One route per menu item. Same table as SpaWebConfig.java and menu.js.
set "OPEN_URL=http://%HOST%:%PORT%/"
if /i "%~1"=="find" set "OPEN_URL=http://%HOST%:%PORT%/find-a-hospital"
if /i "%~1"=="certification" set "OPEN_URL=http://%HOST%:%PORT%/about-certification"
if /i "%~1"=="journey" set "OPEN_URL=http://%HOST%:%PORT%/patient-journey"
if /i "%~1"=="consultation" set "OPEN_URL=http://%HOST%:%PORT%/online-consultation"
if /i "%~1"=="price" set "OPEN_URL=http://%HOST%:%PORT%/check-the-price"
if /i "%~1"=="inquiry" set "OPEN_URL=http://%HOST%:%PORT%/send-an-inquiry"

set "OPEN_BROWSER=1"
set "BUILD_FRONTEND=1"
for %%a in (%*) do (
  if /i "%%~a"=="--no-browser" set "OPEN_BROWSER=0"
  if /i "%%~a"=="--no-build" set "BUILD_FRONTEND=0"
)

cd /d "%APP%"
if errorlevel 1 (
  echo [ERROR] The app folder was not found next to this file.
  pause
  exit /b 1
)

for %%f in (gradlew.bat package.json build-frontend.mjs src\main\resources\static\index.html) do (
  if not exist "%APP%\%%f" (
    echo [ERROR] %%f was not found.
    pause
    exit /b 1
  )
)

rem A missing java sets errorlevel 9009, so this covers PATH too.
java -version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Java 21 was not found. Install Java 21, then run this file again.
  pause
  exit /b 1
)

if "%BUILD_FRONTEND%"=="1" (
  call npm --version >nul 2>&1
  if errorlevel 1 (
    echo [ERROR] npm was not found. Install Node.js, then run this file again.
    pause
    exit /b 1
  )

  rem static\assets\ is gitignored, so a fresh copy of this folder has no
  rem bundle at all. Skipping the build there serves index.html with a 404 for
  rem app.js - a blank white page that looks like a server fault and is not.
  rem esbuild takes about 30ms, so building every time costs nothing.
  if not exist "%APP%\node_modules" (
    echo Installing frontend packages. This runs once.
    call npm install
    if errorlevel 1 (
      echo [ERROR] npm install failed.
      pause
      exit /b 1
    )
  )
  echo Bundling the frontend...
  call npm run build
  if errorlevel 1 (
    echo [ERROR] The frontend bundle failed.
    pause
    exit /b 1
  )
)

echo.
echo ========================================
echo   MediCheck Korea
echo   Home:          http://%HOST%:%PORT%/
echo   Find:          http://%HOST%:%PORT%/find-a-hospital
echo   Certification: http://%HOST%:%PORT%/about-certification
echo   Journey:       http://%HOST%:%PORT%/patient-journey
echo   Consultation:  http://%HOST%:%PORT%/online-consultation
echo   Price:         http://%HOST%:%PORT%/check-the-price
echo   Inquiry:       http://%HOST%:%PORT%/send-an-inquiry
echo   Stop:          Ctrl+C
echo ========================================
echo.

rem Only this port. The association server sits on 5500 and 8080 - killing
rem those from here would stop a service this project has nothing to do with.
rem /c: is required - without it findstr reads ":8081 " as two search terms,
rem and the trailing space is what stops ":8081" from matching ":80811".
rem netstat lists the same listener twice - once for 0.0.0.0 and once for [::] -
rem so the loop sees one PID two times. Reporting after the kill instead of
rem before means the second pass says nothing: the process is already gone, so
rem taskkill fails and && never fires.
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /c:":%PORT% " ^| findstr "LISTENING"') do (
  taskkill /PID %%a /F >nul 2>&1 && echo Stopped the server that held port %PORT% - PID %%a
)

rem Wait for the port instead of guessing a delay. A cold Gradle build takes
rem far longer than a warm one, and a fixed sleep opens the browser on a
rem connection error about half the time.
if "%OPEN_BROWSER%"=="1" start "" /B cmd /c ""%~f0" --wait-and-open "%OPEN_URL%""

call "%APP%\gradlew.bat" -p "%APP%" bootRun

echo.
echo Server stopped.
pause
exit /b 0

rem ------------------------------------------------------------
rem Poll the port for up to 90 seconds, then open the browser once.
rem ping is the sleep here - timeout /t fails when stdin is redirected.
rem ------------------------------------------------------------
:waitopen
set "TARGET=%~2"
if not defined TARGET set "TARGET=http://%HOST%:%PORT%/"
for /l %%i in (1,1,90) do (
  netstat -aon | findstr /c:":%PORT% " | findstr "LISTENING" >nul
  if not errorlevel 1 (
    start "" "%TARGET%"
    exit /b 0
  )
  ping 127.0.0.1 -n 2 >nul
)
echo [WARN] The server did not answer on port %PORT% within 90 seconds.
exit /b 0
