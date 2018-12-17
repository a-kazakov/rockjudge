@echo off

pushd "%~dp0\.."
node env\node_modules\prettier\bin-prettier.js --end-of-line lf --tab-width 4 --print-width 88 --trailing-comma all --write src\client\jsx\**\*.jsx
cmd /C "env\venv\Scripts\activate.bat & black --exclude templates --py36 src\server\"
cmd /C "env\venv\Scripts\activate.bat & black --py36 control\internal\"
popd
