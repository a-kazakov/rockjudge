@echo off

pushd "%~dp0\.."
set home=%cd%

mkdir dist
pushd dist

    mkdir tmp
    pushd tmp

        mkdir src

        copy %home%\*.py src
        del %home%\settings_prod.py

        mkdir src\helpers
        copy %home%\helpers\*.py src\helpers

        mkdir src\protection
        copy %home%\protection\*.py src\protection
        pushd src\protection
            py _compile.py build_ext --inplace
        popd

        mkdir src\models
        copy %home%\models\*.py src\models
        pushd src\models
            py _compile.py build_ext --inplace
        popd

        mkdir src\service
        copy %home%\service\*.py src\service

        mkdir src\scoring_systems
        robocopy %home%\scoring_systems src\scoring_systems *.py /s
        pushd src\scoring_systems
            py _compile.py build_ext --inplace
        popd

        mkdir src\webserver
        copy %home%\webserver\*.py src\webserver
        pushd src\webserver
            py _compile.py build_ext --inplace
        popd

        py %home%\control\internal\make_exe_spec.py
        py %home%\external-tools\pyinstaller\pyinstaller.py exe.spec

        mkdir dist\rockjudge\templates
        copy %home%\templates\*.html dist\rockjudge\templates

        pushd %home%\static
            move js js_old
        popd

        pushd %home%\static\src
            call gulp all --type production
        popd

        mkdir dist\rockjudge\static
        robocopy %home%\static\thirdparty dist\rockjudge\static\thirdparty /s
        robocopy %home%\static\img dist\rockjudge\static\img /s
        robocopy %home%\static\js dist\rockjudge\static\js *.js /s
        robocopy %home%\static\css dist\rockjudge\static\css *.css /s

        pushd %home%\static
            rmdir js /S /Q
            move js_old js
        popd

        mkdir dist\rockjudge\screen
        robocopy %home%\screen dist\rockjudge\screen /s

    popd

    mkdir data
    robocopy tmp\dist\rockjudge\ data /s

    rmdir tmp /S /Q
    robocopy %home%\control\internal\exe_controllers\ .

    mkdir print_server
    pushd print_server

        copy %home%\tools\print.py .
        copy %home%\tools\print-config-sample.txt .\print-config.txt
        py %home%\external-tools\pyinstaller\pyinstaller.py -F print.py
        rmdir build /S /Q
        del print.py
        del print.spec
        copy dist\print.exe .
        rmdir dist /S /Q

    popd

popd

popd
