@echo off

pushd "%~dp0\.."
py control\internal\build.py
popd

pause
