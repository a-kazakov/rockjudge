@echo off

pushd "%~dp0\.."
node env\node_modules\prettier\bin-prettier.js --write src\client\jsx\**\*.jsx
cmd /C "env\venv\Scripts\activate.bat & black --exclude templates --py36 src\server\"
cmd /C "env\venv\Scripts\activate.bat & black --py311 control\internal\"
popd
