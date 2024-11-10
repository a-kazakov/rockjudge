# RockJudge

Система для проведения соревнований по акробатическому рок-н-роллу.

## Обзор системы

Сервер написан на Python 3.11 с использованием фреймворка Tornado для обработки запросов. Работа с базой данных осуществляется с помощью библиотеки SqlAlchemy. В качестве базы данных используется PostgreSQL.

Клиент написан на JavaScript с использованием фреймворка React. Клиент подключается к серверу через WebSocket.

## Структура репозитория

* Каталог `control` содержит скрипты для разработки и сборки системы.
* Каталог `env` содержит файлы окружения (например, `node_modules` для клиента или `virtualenv` для сервера)
* Каталог `src` содержит исходный код системы
  * `src/server` содержит исходный код сервера
  * `src/client` содержит исходный код клиента
    * `src/client/jsx` содержит исходный код React-компонентов
    * `src/client/less` содержит исходный код стилей
    * `src/client/plugins` содержит плагины для клиента (в настоящее время, только для проекции на большой экран)
    * `src/client/static` содержит статические файлы (например, шрифты)
  * `src/tools` содержит вспомогательные скрипты (например, авто-печать)

## Настройка окружения разработки

**Требования к системе:**
* Python 3.11 + virtualenv
* Node.JS + Yarn (для сборки клиента)
* PostgreSQL 12 или выше

**Первоначальная настройка:**
1. Настроить виртуальное окружение Python
    * Windows: 
      * `py -3.11 -m virtualenv env/venv`
      * `env/virtualenv/Scripts/activate`
      * `pip install -r env/requirements.txt`
      * `pip install -r env/requirements-dev.txt`
    * Linux / Mac OS:
      * Убедиться, что Python имеет версию 3.11 или 3.11.* (`python -V`)
      * `python -m virtualenv env/venv`
      * `source env/venv/bin/activate`
      * `pip install -r env/requirements.txt`
      * `pip install -r env/requirements-dev.txt`
2. Настроить сборку клиента
   * `cd env`
   * `yarn`

## Разработка

Во время разработки можно собрать клиент командой `control\build_client.bat` (на Windows) или `control/build_client.sh` (на Linux/Mac OS).

Для подготовки базы данных нужно запустить 
* На Windows: сначала `control\manage.bat install`, а потом `control\manage.bat reset`
* На Linux/Mac OS: сначала `control/manage.sh install`, а потом `control/manage.sh reset`

Для запуска сервера можно воспользоваться скриптом `control\start.bat` (на Windows) или `control/start.sh` (на Linux/Mac OS).

## Окончательная сборка

Окончательную сборку можно производить только на Windows. Для этого нужно запустить скрипт `control\build_prod.bat`. Результат сборки будет находиться в каталоге `dist`.
