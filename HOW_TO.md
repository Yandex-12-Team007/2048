# Как пользоваться приложением

## Оглавление
1. Устанавливаем .env
2. Выбираем 1 из 3-х сборок

## 1 Настройка .env

Для того чтобы настроить .env необходимо выполнить команду :

```text
npm run create
```
### Ленивая настройка :

После запуска `npm run create` на вопрос : `Быстрый конфиг ? [y/n]` - отвечаем `y` - тогда получаем `.env` с настройками по умолчанию 

### Выборочная настройка :

После запуска `npm run create` на вопрос : `Быстрый конфиг ? [y/n]` - отвечаем `n` - после последует список параметров которые мы указываем через консоль

### SSL Сертификат :

После выполнения create скрипта - необходимо переместить свой SSL сертификат в :

``./docker/nginx/ssl``

Потом дописать название своих файлов в `.env`

```dotenv
NGINX_SSL_CERT=
NGINX_SSL_CERT_KEY=
```

Далее необходимо выполнить скрипт :

``
npm run createAfterEnv
``

В целом данный скрипт завязан на все сборки, так что он выполнится при старте любой из выбранных сборок ! 

### Пример `.env` файла :

```dotenv
APP_CONTAINER_NAME=app
DB_CONTAINER_NAME=postgres
DB_HOST_DOCKER=postgres
DB_HOST_LOCAL=localhost
DB_ININT_SQL=init.sql
DB_LOCAL_PORT=5432
DB_NAME=game
DB_PASSWORD=l!j@cneg
DB_PATH=./docker/postgres
DB_PORT=5432
DB_PORT_FORWARDING=54321
DB_USER=server_user
DOMAIN=local.ya-praktikum.tech
NGINX_CONFIG_PATH=./docker/nginx/nginx.conf
NGINX_CONTAINER_NAME=nginx
NGINX_DOCKER_CONFIG_PATH=/etc/nginx/nginx.conf:ro
NGINX_DOCKER_SSL_PATH=/etc/nginx/ssl/
NGINX_LOCAL_SSL_PATH=./docker/nginx/ssl/
NGINX_PATH=./docker/nginx
NGINX_SSL_CERT=local.ya-praktikum.tech.crt
NGINX_SSL_CERT_KEY=local.ya-praktikum.tech-key.key
PG_ADMIN_CONFIG_PATH=./docker/pgadmin
PG_ADMIN_CONTAINER_NAME=pgadmin
PG_ADMIN_EMAIL=admin@admin.com
PG_ADMIN_PASSWORD=secret
PG_ADMIN_PORT=88
PG_ADMIN_SERVERS=servers.json
PG_PORT_FORWARDING=8888
PORT=8000
```

TODO: Потом опишу что есть что

## 2 Выбор сборки

Всего есть 3 конфигурации :
- dev + localDB - запуск webpack в dev режиме + подключение к локальной DB
- dev + dockerDB - запуск webpack в dev режиме + подключение к DB из Docker
- prod - Запуск всего приложения в docker

### DEV + Local

Для запуска данной сборки необходимо выполнить :
```text
npm run devLocal
```

### DEV + Docker

Для запуска данной сборки необходимо выполнить :
```text
npm run devDocker
```

### Docker

Для запуска данной сборки необходимо выполнить :
```text
npm run startDocker
```
