@echo off

pushd "%~dp0\..\client"
node node_modules\prettier\bin-prettier.js --end-of-line lf --tab-width 4 --print-width 88 --trailing-comma all --write src\jsx\**\*.jsx
popd

pushd "%~dp0\.."
venv\Scripts\activate.bat & black --exclude "(node_modules|no-sharing|screen|client|venv|logs|static|.git)" --py36 .
popd
