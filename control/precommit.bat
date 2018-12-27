@echo off

pushd "%~dp0\.."
cmd /C "call env\venv\Scripts\activate.bat & python control\internal\seek_bad_code.py"
popd
