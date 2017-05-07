@echo off

pushd "%~dp0\..\client\node_modules"
py ..\..\control\internal\patch_js.py %*
popd
