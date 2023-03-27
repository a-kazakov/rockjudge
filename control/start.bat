@echo off
if "%~1" equ ":main" (
  shift /1
  for /f "tokens=1,* delims= " %%a in ("%*") do set ARGS=%%b
  goto main
)

set SQLALCHEMY_WARN_20=1

start cmd /d /c "%~f0" :main %*
exit /b

:main
pushd "%~dp0\..\sandbox"
set PYTHONPATH=.
set RJ_BASE_PATH=.
call ..\env\venv_311\Scripts\activate.bat
python ..\src\server\manage.py start
pause
popd
