@echo off

pushd "%~dp0\.."
start cmd /C "venv\Scripts\activate.bat & python manage.py start & pause"
popd
