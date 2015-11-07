@echo off

cd ..

echo Setting up database ...

py install\internal\db_setup.py

echo Creating tables ...

py manage.py reset

echo Done.

pause
