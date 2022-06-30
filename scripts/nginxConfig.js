const config = [
  // Определяет количество рабочих процессов. Обычно, выставляют равному числу ядер, но в новых версиях его лучше устанавливать в auto. По умолчанию 1
  {name: 'worker_processes', type: 'option', params: 'auto'},
  // {name: 'worker_priority', type: 'option', params: '-2'},

  {name: 'events', type: 'block', params: '', children: [
    // Количество рабочих процессов
    {name: 'worker_connections', type: 'option', params: '1024'},
    // Позволяет принимать максимально возможное количество соединений. Иначе, процесс nginx за один раз будет принимать только одно новое соединение. По умолчанию off.
    {name: 'multi_accept', type: 'option', params: 'on'},
  ]},
  {name: 'http', type: 'block', params: '', children: [
    // TODO: Не помню зачем ) Вроде для DNS =)
    {name: 'resolver', type: 'option', params: '127.0.0.11 ipv6=off'},
    {name: 'include', type: 'option', params: 'mime.types'},
    // Логирование
    {name: 'log_format', type: 'option', params: '$remote_addr - $remote_user [$time_local] \n\t\t\t\t"$request" $status $body_bytes_sent \n\t\t\t\t"$http_referer" "$http_user_agent" "$gzip_ratio"'},

    // gzip
    {name: 'gzip', type: 'option', params: 'on'},
    {name: 'gzip_min_length', type: 'option', params: '1000'},
    {name: 'gzip_proxied', type: 'option', params: 'expired no-cache no-store private auth'},
    {name: 'gzip_types', type: 'option', params: 'text/plain text/css text/javascript application/javascript application/x-javascript text/xml application/xml application/xml+rss application/json'},
    {name: 'gzip_disable', type: 'option', params: '"msie6"'},

    // Оптимизация работы соединения
    // Отвечает за максимальное время поддержания keepalive-соединения, в случае, если пользователь по нему ничего не запрашивает. Для современных систем, стоит выставить от 30 до 50. В нашем случае 45. По умолчанию 75.
    {name: 'keepalive_timeout', type: 'option', params: '45'},
    // Если клиент перестал читать страницу, Nginx будет сбрасывать соединение с ним. По умолчанию off.
    {name: 'reset_timedout_connection', type: 'option', params: 'on'},
    // Ждет выставленное количество секунд тело запроса от клиента, после чего сбрасывает соединение. По умолчанию 60.
    {name: 'client_body_timeout', type: 'option', params: '35'},
    // Если клиент прекратит чтение ответа, Nginx подождет выставленное количество секунд и сбросит соединение. По умолчанию 60.
    {name: 'send_timeout', type: 'option', params: '30'},

    // Оптимизация работы с файлами
    // позволяет использовать более совершенный системный вызов, который обеспечивает прямую передачу файла, то есть без системных вызовов read + write.
    {name: 'sendfile', type: 'option', params: 'on'},
    // включает использование асинхронного обращения к файлам, что избавит от очередей запросов.
    {name: 'aio', type: 'option', params: 'on'},
    // позволит передавать заголовок ответа и начало файла в одном пакете.
    {name: 'tcp_nopush', type: 'option', params: 'on'},
    // по умолчанию выключена. Задает настройку для кэширования информации о файлах, с которыми работает nginx. По умолчанию выключено.
    {name: 'open_file_cache', type: 'option', params: 'max=100000 inactive=20s'},
    // задает время, через которое веб-сервер будет проверять актуальность данных. По умолчанию 60 секунд.
    {name: 'open_file_cache_valid', type: 'option', params: '45s'},
    // задает минимальное число обращений к файлу, чтобы дескриптор файла оставался открытым в кэше.
    {name: 'open_file_cache_min_uses', type: 'option', params: '2'},
    // включает или выключает кэширование ошибок.
    {name: 'open_file_cache_errors', type: 'option', params: 'on'},


    // Redirect http
    {name: 'server', type: 'block', params: '', children: [
      {name: 'listen', type: 'option', params: '[::]:80 backlog=2048 ipv6only=off'},
      {name: 'server_name', type: 'option_replace', params: '%DOMAIN% www.%DOMAIN%', replace: ['DOMAIN']},
      {name: 'return', type: 'option', params: '301 https://$server_name$request_uri'},
    ]},

    // Основной сервер
    {name: 'server', type: 'block', params: '', children: [
      {name: 'listen', type: 'option', params: '[::]:443 ssl http2 backlog=2048 ipv6only=off'},
      {name: 'server_name', type: 'option_replace', params: '%DOMAIN%', replace: ['DOMAIN']},
      {name: 'root', type: 'option', params: '$root'},
      {name: 'charset', type: 'option', params: 'utf-8'},

      {name: 'set', type: 'option_replace', params: '$root %ROOT%', replace: ['ROOT']},

      // X-XSS-Protection
      {name: 'add_header', type: 'option', params: 'X-XSS-Protection 1'},

      // CSP - protection
      {name: 'add_header', type: 'option', params: 'Content-Security-Policy "default-src \'self\';" always'},

      // X-Freame-Options
      // Запрещаем Iframe - у нас они не используются =)
      {name: 'add_header', type: 'option', params: 'X-Frame-Options "DENY"'},

      // X-Permitted-Cross-Domain-Policies
      // Разрешаем CORS - так как у нас API на стороне
      {name: 'add_header', type: 'option', params: 'X-Permitted-Cross-Domain-Policies all'},

      // Strict-Transport-Security
      // Заголовок Strict-Transport-Security запрещает использование незащищенного HTTP соединения на сайте, если есть защищенное HTTPS.
      {name: 'add_header', type: 'option', params: 'Strict-Transport-Security "max-age=31536000; includeSubDomains" always'},

      // X-Content-Type-Options
      // Запрещаем автоматическое определение типа фалов
      {name: 'add_header', type: 'option', params: 'X-Content-Type-Options nosniff'},

      {name: 'ssi', type: 'option', params: 'on'},
      {name: 'add_header', type: 'option', params: 'Strict-Transport-Security "max-age=31536000"'},
      {name: 'ssl_ciphers', type: 'option', params: 'HIGH:!RC4:!aNULL:!eNULL:!MD5:!EXPORT:!EXP:!LOW:!SEED:!CAMELLIA:!IDEA:!PSK:!SRP:!SSLv2'},
      {name: 'ssl_prefer_server_ciphers', type: 'option', params: 'on'},
      {name: 'ssl_protocols', type: 'option', params: 'TLSv1 TLSv1.1 TLSv1.2'},
      // {name: 'ssl_certificate', type: 'option_replace', params: '%NGINX_DOCKER_SSL_PATH%%NGINX_SSL_CERT%', replace: ['NGINX_DOCKER_SSL_PATH', 'NGINX_SSL_CERT']},
      // {name: 'ssl_certificate_key', type: 'option_replace', params: '%NGINX_DOCKER_SSL_PATH%%NGINX_SSL_CERT_KEY%', replace: ['NGINX_DOCKER_SSL_PATH', 'NGINX_SSL_CERT_KEY']},

      // certbot
      {name: 'ssl_certificate', type: 'option', params: '/etc/letsencrypt/live/barcelona-2048-12.ya-praktikum.tech-0001/fullchain.pem'},
      {name: 'ssl_certificate_key', type: 'option', params: '/etc/letsencrypt/live/barcelona-2048-12.ya-praktikum.tech-0001/privkey.pem'},
      {name: 'ssl_trusted_certificate', type: 'option', params: '/etc/letsencrypt/livebarcelona-2048-12.ya-praktikum.tech-0001/chain.pem'},
      // {name: 'include', type: 'option', params: '/etc/letsencrypt/options-ssl-nginx.conf'},
      // {name: 'ssl_dhparam', type: 'option', params: '/etc/letsencrypt/ssl-dhparams.pem'},

      {name: 'proxy_connect_timeout', type: 'option', params: '600'},
      {name: 'proxy_send_timeout', type: 'option', params: '600'},
      {name: 'proxy_read_timeout', type: 'option', params: '600'},
      {name: 'send_timeout', type: 'option', params: '600'},
      {name: 'location', type: 'block', params: '= /favicon.jpg', children: [
        {name: 'root', type: 'option', params: '$root'},
      ]},

      // {name: 'location', type: 'block', params: '= /robots.txt', children: [
      //   {name: 'root', type: 'option', params: '$root'},
      // ]},

      {name: 'location', type: 'block', params: '/.well-known/acme-challenge/', children: [
        {name: 'root', type: 'option', params: '/var/www/certbot'},
      ]},

      // Проверка статуса сервера
      {name: 'location', type: 'block', params: '/ping', children: [
        {name: 'add_header', type: 'option', params: 'content-type "application/json"'},
        {name: 'return', type: 'option', params: '200 \'{"status": "ok", "message": "pong", "timestamp": "$date_gmt", "env": "<my-env>"}\''},
      ]},

      // TODO: Сложно настроить на 2 адресса, нужно отдельно делать для App и PgAdmin
      // Кэшируем Media
      // {name: 'location', type: 'block', params: '~* \\.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|mp4|ogg|ogv|webm|htc)$', children: [
      //   {name: 'expires', type: 'option', params: '30d'},
      // ]},
      //
      // {name: 'location', type: 'block', params: '~* \\.(css|js|woff2)$', children: [
      //   {name: 'expires', type: 'option', params: '365d'},
      // ]},

      // Настройки проксирования в pgAdmin
      {name: 'location', type: 'block_replace', params: '/%PG_ADMIN_CONTAINER_NAME%/', replace: ['PG_ADMIN_CONTAINER_NAME'], children: [
        {name: 'proxy_set_header', type: 'option', params: 'X-Script-Name /pgadmin/'},
        {name: 'proxy_set_header', type: 'option', params: 'X-Scheme $scheme'},
        {name: 'proxy_set_header', type: 'option', params: 'Host $host'},
        {name: 'proxy_pass', type: 'option_replace', params: 'http://%PG_ADMIN_CONTAINER_NAME%:%PG_ADMIN_PORT%/', replace: ['PG_ADMIN_CONTAINER_NAME', 'PG_ADMIN_PORT']},
        {name: 'proxy_redirect', type: 'option', params: 'off'},
      ]},

      // Настройки проксирования в приложение
      {name: 'location', type: 'block', params: '/', children: [
        {name: 'add_header', type: 'option', params: 'X-App-Host $host'},
        {name: 'add_header', type: 'option', params: 'Last-Modified $date_gmt'},
        {name: 'add_header', type: 'option', params: 'Cache-Control \'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0\''},
        {name: 'add_header', type: 'option', params: 'Access-Control-Allow-Origin *'},
        {name: 'if_modified_since', type: 'option', params: 'off'},
        {name: 'proxy_set_header', type: 'option', params: 'X-Script-Name /app/'},
        {name: 'proxy_set_header', type: 'option', params: 'X-Scheme $scheme'},
        {name: 'proxy_set_header', type: 'option', params: 'Host $host'},
        {name: 'proxy_pass', type: 'option_replace', params: 'http://%APP_CONTAINER_NAME%:%PORT%/', replace: ['APP_CONTAINER_NAME', 'PORT']},
        {name: 'proxy_redirect', type: 'option', params: 'off'},
      ]},
    ]},
  ]},
];

module.exports = config;
