@echo off

pushd "%~dp0\data"
rockjudge.exe install && rockjudge.exe reset yes-i-am-sure
popd

pause
