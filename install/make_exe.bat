@echo off

set startpath=%cd%

mkdir ..\dist
cd ..\dist

mkdir tmp
cd tmp

mkdir src

copy ..\..\*.py src

mkdir src\fixtures
copy ..\..\fixtures\*.py src\fixtures

mkdir src\helpers
copy ..\..\helpers\*.py src\helpers

mkdir src\models
copy ..\..\models\*.py src\models

mkdir src\scoring_systems
robocopy ..\..\scoring_systems src\scoring_systems *.py /s

mkdir src\webserver
copy ..\..\webserver\*.py src\webserver

py %startpath%\internal\make_exe_spec.py

py %startpath%\..\external-tools\pyinstaller\pyinstaller.py exe.spec

mkdir dist\rockjudge\templates
copy ..\..\templates\*.html dist\rockjudge\templates

mkdir dist\rockjudge\static
robocopy ..\..\static\thirdparty dist\rockjudge\static\thirdparty /s
robocopy ..\..\static\img dist\rockjudge\static\img /s
robocopy ..\..\static\js dist\rockjudge\static\js *.js /s
robocopy ..\..\static\css dist\rockjudge\static\css *.css /s

forfiles /m *.js /p dist\rockjudge\static\js /s /c "cmd /C move @file tmp.js & java -jar %startpath%\..\external-tools\closure-compiler.jar --js tmp.js --js_output_file @file --compilation_level SIMPLE_OPTIMIZATIONS & del tmp.js"

cd ..

mkdir data
robocopy tmp\dist\rockjudge\ data /s

rmdir tmp /S /Q
robocopy %startpath%\internal\exe_controllers\ .

cd %startpath%
