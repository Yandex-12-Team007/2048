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

  const PG_INIT_SQL_PATH = path.resolve(POSTGRES_DIR, process.env.DB_ININT_SQL);
  const pgInitSql = fs.openSync(PG_INIT_SQL_PATH, 'w');

  const sql = 'select 1';

  fs.writeSync(pgInitSql, sql);
  fs.closeSync(pgInitSql);
} catch (e) {
  console.log(e);
}
