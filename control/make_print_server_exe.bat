@echo off

pushd "%~dp0\.."
set home=%cd%

mkdir dist
pushd dist

    mkdir print_server
    pushd print_server

        copy %home%\tools\print.py .
        py %home%\external-tools\pyinstaller\pyinstaller.py -F print.py
        rmdir build /S /Q
        del print.py
        del print.spec
        copy dist\print.exe .
        rmdir dist /S /Q

    popd

popd
popd