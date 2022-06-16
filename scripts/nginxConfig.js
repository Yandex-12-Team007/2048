const config = [
  {name: 'server', type: 'block', params: '', children: [
    {name: 'set', type: 'option_replace', params: '%ROOT%', replace: ['ROOT']},
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
    {name: 'location', type: 'block', params: '/pind', children: [
      {name: 'add_header', type: 'option', params: 'content-type "application/json"'},
      {name: 'return', type: 'option', params: '200 \'{"status": "ok", "message": "pong", "timestamp": "$date_gmt", "env": "<my-env>"}\''},
    ]},
    {name: 'location', type: 'block', params: '/', children: [
      {name: 'add_header', type: 'option', params: 'X-App-Host $host'},
      {name: 'add_header', type: 'option', params: 'Last-Modified $date_gmt'},
      {name: 'add_header', type: 'option', params: 'Cache-Control \'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0\''},
      {name: 'add_header', type: 'option', params: 'Access-Control-Allow-Origin *'},
      {name: 'if_modified_since', type: 'option', params: 'off'},
      {name: 'expires', type: 'option', params: 'off'},
      {name: 'try_files', type: 'option', params: '$uri /index.html'},
    ]},
  ]},
];

module.exports = config;
