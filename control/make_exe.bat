@echo off

pushd "%~dp0\.."
set home=%cd%

mkdir dist
pushd dist

    mkdir tmp
    pushd tmp

        mkdir src

        copy %home%\*.py src

        mkdir src\fixtures
        copy %home%\fixtures\*.py src\fixtures

        mkdir src\helpers
        copy %home%\helpers\*.py src\helpers

        mkdir src\models
        copy %home%\models\*.py src\models

        mkdir src\service
        copy %home%\service\*.py src\service

        mkdir src\scoring_systems
        robocopy %home%\scoring_systems src\scoring_systems *.py /s

        mkdir src\webserver
        copy %home%\webserver\*.py src\webserver

        py %home%\control\internal\make_exe_spec.py
        py %home%\external-tools\pyinstaller\pyinstaller.py exe.spec

        mkdir dist\rockjudge\templates
        copy %home%\templates\*.html dist\rockjudge\templates

        mkdir dist\rockjudge\static
        robocopy %home%\static\thirdparty dist\rockjudge\static\thirdparty /s
        robocopy %home%\static\img dist\rockjudge\static\img /s
        robocopy %home%\static\js dist\rockjudge\static\js *.js /s
        robocopy %home%\static\css dist\rockjudge\static\css *.css /s

        mkdir dist\rockjudge\screen
        robocopy %home%\screen dist\rockjudge\screen /s

        forfiles /m *.js /p dist\rockjudge\static\js /s /c "cmd /C move @file tmp.js & java -jar %home%\external-tools\closure-compiler.jar --js tmp.js --js_output_file @file --compilation_level SIMPLE_OPTIMIZATIONS & del tmp.js"

    popd

    mkdir data
    robocopy tmp\dist\rockjudge\ data /s

    rmdir tmp /S /Q
    robocopy %home%\control\internal\exe_controllers\ .

popd

popd
