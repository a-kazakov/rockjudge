@echo off

pushd "%~dp0\.."
start cmd /C "call env\venv_311\Scripts\activate.bat & python control\internal\build.py %* & pause"
popd
