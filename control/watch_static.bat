@echo off
pushd "%~dp0\..\static"

start autoless --autoprefix "last 10 versions, > 1%%" less css
popd
