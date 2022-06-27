// Создаем подключение по умолчанию для PgAdmin
try {
  const fs = require('node:fs');
  const path = require('node:path');
  const env = require('node-env-file');
  const ROOT = path.resolve(__dirname, '..');

  // Получаем переменное окружение
  env(path.resolve(ROOT, '.env'));

  process.env.ROOT = ROOT;

  const PGADMIN_DIR = path.resolve(ROOT, 'docker', 'pgadmin');

  if (!fs.existsSync(PGADMIN_DIR)) {
    fs.mkdirSync(PGADMIN_DIR, {
      recursive: true,
      mode: '0777',
    });
  }

  const PG_ADMIN_SERVERS_FILE_PATH = path.resolve(PGADMIN_DIR, process.env.PG_ADMIN_SERVERS);
  const pgAdminServers = fs.openSync(PG_ADMIN_SERVERS_FILE_PATH, 'w');

  // Если не режим разработки - берем DN из Composer
  // Если локалка с Docker - выставляем localhost;
  // Если локалка без Docker - смотрим Адресс из .env;
  const DB_HOST = process.env.NODE_ENV !== 'development' ?
    process.env.DB_HOST_DOCKER :
    process.env.IS_DOCKER ?
      process.env.DB_HOST_DOCKER :
      process.env.DB_HOST_LOCAL;


  // Если не режим разработки - берем внутрений порт сети
  // Если локалка с Docker - выставляем внешний порт;
  // Если локалка без Docker - выставляем .env порт для локальной БД;
  const DB_PORT = process.env.NODE_ENV !== 'development' ?
    process.env.DB_PORT :
    process.env.IS_DOCKER ?
      process.env.DB_PORT :
      process.env.DB_LOCAL_PORT

  const config = {
    'Servers': {
      '1': {
        'Name': process.env.DB_NAME,
        'Group': process.env.DB_NAME,
        'Port': DB_PORT,
        'Username': process.env.DB_USER,
        'Host': DB_HOST,
        'SSLMode': 'prefer', // Возможно уберем
        'MaintenanceDB': process.env.DB_NAME,
      },
    },
  }
  fs.writeSync(pgAdminServers, JSON.stringify(config, null, 2));
  fs.closeSync(pgAdminServers);
} catch (e) {
  console.log(e);
}
