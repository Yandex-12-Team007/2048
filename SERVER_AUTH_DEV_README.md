# Как засвести server-auth-middleware на DEV локации

# !!! УСТАРЕВШЕЕ ЧИТАТЬ ТОЛЬКО ДЛЯ ОБЩЕГО РАЗВИТИЯ !!!

## Порядок действий
1. Прописать в /etc/hosts домен local.ya-praktikum.tech
2. Создать сертификат
3. Добавить сертификат в Express

### 1 - Добавление Домена

Тут все в целом просто, открываем файл /etc/hosts своим текстовым редактором под правами root и дописываем :

```text
sudo {Ваш тестовый редактор} /etc/hosts
```

Дописываем строчку с `local.ya-praktikum.tech` 

```text
127.0.0.1       localhost
127.0.1.1       lenin-Z490-UD

127.0.0.1       local.ya-praktikum.tech
```

Сохраняем

Чтобы убедиться что изменения прошли корректно, нужно запустить наш дев сервер `npm run dev` и открыть его по адрессу : `local.ya-praktikum.tech:8000`

### 2 - Создание сертификата

Тут проще всего пройтись по гайду от `@vlad`

[Гайд по сертификату](https://web.dev/how-to-use-local-https/)

Там достаточно много полезной информации, помимо необходимой

Пример команды которой создавал я :

`sudo certbot certonly -d ya-praktikum.tech -d *.ya-praktikum.tech --manual --preferred-challenges dns`

#### Важные моменты :
- домен 2-го уровня все будет `ya-praktikum.tech` - т.к. с него нам и нужно взять cookie
- домен третьего уровня пишем на `*`, тогда не важно как мы назвались в `/etc/hosts`

### 3 - Настариваем Express

1. Создаем папку в корне `certs`
2. Закидываем туда созданные сертификаты
3. Заменяем названия в `src/server.ts` :
```javascript
const key = fs.readFileSync(path.resolve(__dirname, '../certs', 'local.ya-praktikum.tech-key.pem'));
const cert = fs.readFileSync(path.resolve(__dirname, '../certs', 'local.ya-praktikum.tech.pem'));
```

TODO: Думаю когда нибуть начнем брать путь к сертификату из .env =)))
