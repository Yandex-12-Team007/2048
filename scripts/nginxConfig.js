const config = [
  {name: 'events', type: 'block', params: '', children: [
    {name: 'worker_connections', type: 'option', params: '1024'},
  ]},
  {name: 'http', type: 'block', params: '', children: [
    {name: 'resolver', type: 'option', params: '127.0.0.11 ipv6=off'},
    {name: 'include', type: 'option', params: 'mime.types'},
    {name: 'log_format', type: 'option', params: '$remote_addr - $remote_user [$time_local] \n\t\t\t\t"$request" $status $body_bytes_sent \n\t\t\t\t"$http_referer" "$http_user_agent" "$gzip_ratio"'},
    // {name: 'resolver', type: 'option', params: '$root'},

    {name: 'server', type: 'block', params: '', children: [
      {name: 'listen', type: 'option', params: '[::]:80 backlog=2048 ipv6only=off'},
      {name: 'server_name', type: 'option_replace', params: '%DOMAIN% www.%DOMAIN%', replace: ['DOMAIN']},
      {name: 'return', type: 'option', params: '301 https://$server_name$request_uri'},
    ]},

    {name: 'server', type: 'block', params: '', children: [
      {name: 'set', type: 'option_replace', params: '$root %ROOT%', replace: ['ROOT']},

      {name: 'listen', type: 'option', params: '[::]:443 ssl http2 backlog=2048 ipv6only=off'},
      {name: 'ssi', type: 'option', params: 'on'},
      {name: 'add_header', type: 'option', params: 'Strict-Transport-Security "max-age=31536000"'},
      {name: 'ssl_ciphers', type: 'option', params: 'HIGH:!RC4:!aNULL:!eNULL:!MD5:!EXPORT:!EXP:!LOW:!SEED:!CAMELLIA:!IDEA:!PSK:!SRP:!SSLv2'},
      {name: 'ssl_prefer_server_ciphers', type: 'option', params: 'on'},
      {name: 'ssl_protocols', type: 'option', params: 'TLSv1 TLSv1.1 TLSv1.2'},
      {name: 'ssl_certificate', type: 'option_replace', params: '%NGINX_DOCKER_SSL_PATH%%NGINX_SSL_CERT%', replace: ['NGINX_DOCKER_SSL_PATH', 'NGINX_SSL_CERT']},
      {name: 'ssl_certificate_key', type: 'option_replace', params: '%NGINX_DOCKER_SSL_PATH%%NGINX_SSL_CERT_KEY%', replace: ['NGINX_DOCKER_SSL_PATH', 'NGINX_SSL_CERT_KEY']},


      {name: 'server_name', type: 'option_replace', params: '%DOMAIN%', replace: ['DOMAIN']},
      {name: 'root', type: 'option', params: '$root'},
      {name: 'charset', type: 'option', params: 'utf-8'},

      {name: 'proxy_connect_timeout', type: 'option', params: '600'},
      {name: 'proxy_send_timeout', type: 'option', params: '600'},
      {name: 'proxy_read_timeout', type: 'option', params: '600'},
      {name: 'send_timeout', type: 'option', params: '600'},
      {name: 'server_name', type: 'option', params: 'ya-practicum.tech'},
      {name: 'location', type: 'block', params: '= /favicon.jpg', children: [
        {name: 'root', type: 'option', params: '$root'},
      ]},
      {name: 'location', type: 'block', params: '= /robots.txt', children: [
        {name: 'root', type: 'option', params: '$root'},
      ]},
      {name: 'location', type: 'block', params: '/ping', children: [
        {name: 'add_header', type: 'option', params: 'content-type "application/json"'},
        {name: 'return', type: 'option', params: '200 \'{"status": "ok", "message": "pong", "timestamp": "$date_gmt", "env": "<my-env>"}\''},
      ]},
      {name: 'location', type: 'block_replace', params: '/%APP_CONTAINER_NAME%/', replace: ['APP_CONTAINER_NAME'], children: [
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
      {name: 'location', type: 'block_replace', params: '/%PG_ADMIN_CONTAINER_NAME%/', replace: ['PG_ADMIN_CONTAINER_NAME'], children: [
        {name: 'proxy_set_header', type: 'option', params: 'X-Script-Name /pgadmin/'},
        {name: 'proxy_set_header', type: 'option', params: 'X-Scheme $scheme'},
        {name: 'proxy_set_header', type: 'option', params: 'Host $host'},
        {name: 'proxy_pass', type: 'option_replace', params: 'http://%PG_ADMIN_CONTAINER_NAME%:%PG_ADMIN_PORT%/', replace: ['PG_ADMIN_CONTAINER_NAME', 'PG_ADMIN_PORT']},
        {name: 'proxy_redirect', type: 'option', params: 'off'},
      ]},
    ]},
  ]},
];

module.exports = config;
