@echo off
if "%~1" equ ":main" (
  shift /1
  for /f "tokens=1,* delims= " %%a in ("%*") do set ARGS=%%b
  goto main
)

cmd /d /c "%~f0" :main %*
exit /b

:main
pushd "%~dp0\..\env"
node node_modules\gulp\bin\gulp.js --gbase ../src/client/ --gdest ../sandbox/ %ARGS%
popd
