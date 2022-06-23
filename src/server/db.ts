import {Sequelize} from 'sequelize';
import {sequalizeLogger} from './middleware/logger';

const logger = sequalizeLogger();

const sequalize = new Sequelize(
    // @ts-ignore
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      logging: (msg) => logger.info(msg),
    }
)

export default sequalize;
