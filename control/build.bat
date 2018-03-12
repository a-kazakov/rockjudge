@echo off

pushd "%~dp0\.."
python control\internal\build.py %*
popd

pause
