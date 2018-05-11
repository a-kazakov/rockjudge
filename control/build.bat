@echo off

pushd "%~dp0\.."
start cmd /C "venv\Scripts\activate.bat & python control\internal\build.py %* & pause"
popd
