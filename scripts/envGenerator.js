// Wizard помошник по .env

async function main() {
  const path = require('path');
  const fs = require('node:fs');
  process.stdin.setEncoding('utf8');
  try {
    let skip = false;
    // Пробегаемся по аргументам =)
    process.argv.forEach(function(val, index, array) {
      if (val === '-y') {
        skip = true;
      }
    });

    // Пропуск при стандартном запуске
    if (!skip) {
      process.stdout.write(`Быстрый конфиг ? [y/n] : `);
      const res = await readlineSync();
      if (res === 'y' || res === 'Y') {
        skip = true;
      }
    }


    const ENV_PATH = path.resolve(__dirname, '..', '.env');
    const envFile = fs.openSync(ENV_PATH, 'w');

    const config = generateStatic();

    const READED_PARAMS = [
      {name: 'PORT', defaultValue: '8000', label: 'Порт приложения'},
      {name: 'DB_NAME', defaultValue: 'game', label: 'Название базы'},
      {name: 'DB_USER', defaultValue: 'server_user', label: 'Login пользователя'},
      {name: 'DB_PASSWORD', defaultValue: '12345', label: 'Пароль пользователя'},
      {name: 'DB_HOST_LOCAL', defaultValue: 'localhost', label: 'Host дб для локальной сборки'},
      {name: 'DB_LOCAL_PORT', defaultValue: '5432', label: 'Port для сборки без Докера'},
      {name: 'DB_PORT', defaultValue: '5432', label: 'Port дб у Докера'},
      {name: 'DB_PORT_FORWARDING', defaultValue: '54321', label: 'Пробрасываемый порт из Docker'},
      {name: 'PG_ADMIN_EMAIL', defaultValue: 'admin@admin.com', label: 'Login пользователя pgAdmin'},
      {name: 'PG_ADMIN_PASSWORD', defaultValue: 'secret', label: 'Пароль пользователя pgAdmin'},
      {name: 'PG_ADMIN_PORT', defaultValue: '88', label: 'Порт pgAdmin'},
      {name: 'PG_PORT_FORWARDING', defaultValue: '8888', label: 'Порт pgAdmin'},
      {name: 'NGINX_SSL_CERT', defaultValue: '', label: 'Cert для SSL'},
      {name: 'NGINX_SSL_CERT_KEY', defaultValue: '', label: 'Key для SSL'},
    ];

    if (skip) {
      placeholderParams(config, READED_PARAMS);
    } else {
      await readParams(config, READED_PARAMS);
    }

    fs.writeSync(envFile, confToEnv(config));
    fs.closeSync(envFile);
  } catch (e) {
    console.log(e);
  }
}

main();

// Большая часть конфига не будет меняться, Вписываем статичную часть
function generateStatic() {
  return {
    DOMAIN: 'local.ya-praktikum.tech',
    APP_CONTAINER_NAME: 'app',
    DB_CONTAINER_NAME: 'postgres',
    DB_HOST_DOCKER: 'postgres',
    DB_PATH: './docker/postgres',
    DB_INIT_SQL: 'init.sql',
    PG_ADMIN_CONTAINER_NAME: 'pgadmin',
    PG_ADMIN_CONFIG_PATH: './docker/pgadmin',
    PG_ADMIN_SERVERS: 'servers.json',
    NGINX_CONTAINER_NAME: 'nginx',
    NGINX_PATH: './docker/nginx',
    NGINX_CONFIG_PATH: './docker/nginx/nginx.conf',
    NGINX_DOCKER_CONFIG_PATH: '/etc/nginx/nginx.conf:ro',
    NGINX_LOCAL_SSL_PATH: './docker/nginx/ssl/',
    NGINX_DOCKER_SSL_PATH: '/etc/nginx/ssl/',
  }
}

async function readParams(config, params) {
  for (const paramKey in params) {
    const param = params[paramKey];
    process.stdout.write(`${param.name} : ${param.label} (${param.defaultValue}) : `);
    config[param.name]=await readlineSync();
  }
}

function placeholderParams(config, params) {
  for (const paramKey in params) {
    const param = params[paramKey];
    config[param.name] = param.defaultValue;
  }
}

function readlineSync() {
  return new Promise((resolve, reject) => {
    process.stdin.resume();
    process.stdin.on('data', (data) => {
      process.stdin.pause(); // stops after one line reads
      const str = ''+data;
      resolve(str.replace('\n', ''));
      // Чистим stdin от самого себя =)
      process.stdin.removeAllListeners();
    });
  });
}

function confToEnv(config) {
  // Отфильтруем названия по имени
  // TODO: Хотелось бы разделение между сущностями
  const arr = [];

  function compare(a, b) {
    if ( a.name < b.name ) {
      return -1;
    }
    if ( a.name > b.name ) {
      return 1;
    }
    return 0;
  }

  for (const key in config) {
    const param = config[key];
    arr.push({name: key, value: param});
  }
  const str = arr.sort(compare)
      .map((el) => `${el.name}=${el.value}`)
      .join('\n');

  return str;
}
