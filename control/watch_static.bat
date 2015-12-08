@echo off
pushd "%~dp0\..\static"

start babel -s -d js jsx --watch --presets ../external-tools/node_modules/babel-preset-react,../external-tools/node_modules/babel-preset-es2015
start autoless --autoprefix "last 10 versions, > 1%%" less css
popd
