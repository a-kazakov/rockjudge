@echo off

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params = %*:"=""
    echo UAC.ShellExecute "cmd.exe", "/c %~s0 %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"

REM --> "
:--------------------------------------

cd ..

echo Installing python modules ...

pip3 install openpyxl
pip3 install control\internal\psycopg2-2.6.1-cp35-none-win_amd64.whl
pip3 install aiopg==0.7.0
pip3 install peewee==2.6.4
pip3 install peewee-async==0.3.1
pip3 install tornado
pip3 install sockjs-tornado

echo Setting up database ...

py control\internal\db_setup.py

echo Creating tables ...

py manage.py reset

echo Done.

pause
