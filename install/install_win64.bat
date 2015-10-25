@echo off

cd ..

echo Installing python modules ...

pip3 install openpyxl
pip3 install aiopg==0.7.0
pip3 install install/internal/psycopg2-2.6.1-cp35-none-win_amd64.whl
pip3 install peewee==2.6.4
pip3 install peewee-async==0.3.1
pip3 install tornado
pip3 install sockjs-tornado

echo Setting up database ...

py install/internal/db_setup.py

echo Creating tables ...

py manage.py reset

echo Done.

pause
