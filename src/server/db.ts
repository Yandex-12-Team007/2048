import {Sequelize} from 'sequelize';
import {sequalizeLogger} from './middleware/logger';

const logger = sequalizeLogger();

// Если не режим разработки - берем DN из Composer
// Если локалка с Docker - выставляем localhost;
// Если локалка без Docker - смотрим Адресс из .env;
const DB_HOST = process.env.NODE_ENV !== 'development' ?
  process.env.DB_HOST_DOCKER :
  process.env.IS_DOCKER ?
    'localhost' :
    process.env.DB_HOST_LOCAL

// Если не режим разработки - берем внутрений порт сети
// Если локалка с Docker - выставляем внешний порт;
// Если локалка без Docker - выставляем .env порт для локальной БД;
const DB_PORT = process.env.NODE_ENV !== 'development' ?
  process.env.DB_PORT :
  process.env.IS_DOCKER ?
    process.env.DB_PORT_FORWARDING :
    process.env.DB_LOCAL_PORT


const sequalize = new Sequelize(
    // @ts-ignore
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
      dialect: 'postgres',
      DB_HOST,
      DB_PORT,
      logging: (msg) => logger.info(msg),
    }
)

export default sequalize;
