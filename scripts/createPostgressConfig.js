// Создаем конфиги для postgres
try {
  const fs = require('node:fs');
  const path = require('node:path');
  const env = require('node-env-file');
  // Находим корневой каталог
  const ROOT = path.resolve(__dirname, '..');
  process.env.ROOT = ROOT;

  // Получаем переменное окружение
  env(path.resolve(ROOT, '.env'));

  const POSTGRES_DIR = process.env.DB_PATH;

  if (!fs.existsSync(POSTGRES_DIR)) {
    fs.mkdirSync(POSTGRES_DIR, {
      recursive: true,
      mode: '0777',
    });
  }

  const PG_INIT_SQL_PATH = path.resolve(POSTGRES_DIR, process.env.DB_INIT_SQL);
  const pgInitSql = fs.openSync(PG_INIT_SQL_PATH, 'w');

  const sql = 'select 1';

  fs.writeSync(pgInitSql, sql);
  fs.closeSync(pgInitSql);

//   const PG_SEQUALIZE_CONNECTION_PATH = path.resolve(POSTGRES_DIR, process.env.DB_CONNECT_CONFIG);
//   const configFile = fs.openSync(PG_SEQUALIZE_CONNECTION_PATH, 'w');
//
//   const DB_HOST = process.env.NODE_ENV !== 'development' ?
//     process.env.DB_HOST_DOCKER :
//     process.env.IS_DOCKER ?
//       'localhost' :
//       process.env.DB_HOST_LOCAL
//
//   // Если не режим разработки - берем внутрений порт сети
//   // Если локалка с Docker - выставляем внешний порт;
//   // Если локалка без Docker - выставляем .env порт для локальной БД;
//   const DB_PORT = process.env.NODE_ENV !== 'development' ?
//     process.env.DB_PORT :
//     process.env.IS_DOCKER ?
//       process.env.DB_PORT_FORWARDING :
//       process.env.DB_LOCAL_PORT
//
//   const config = [
//     process.env.DB_NAME, // Название БД
//     process.env.DB_USER, // Пользователь
//     process.env.DB_PASSWORD, // ПАРОЛЬ
//     {
//       dialect: 'postgres',
//       host: DB_HOST,
//       post: DB_PORT,
//     },
//   ];
//
//   const str = `const sequelizeConfig = ${JSON.stringify(config, null, 2)};
//
// export default sequelizeConfig;`
//
//   fs.writeSync(configFile, str);
//   fs.closeSync(configFile);
} catch (e) {
  console.log(e);
}
