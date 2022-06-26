import {Sequelize} from 'sequelize';

import {sequelizeLogger} from './middleware/logger';
const logger = sequelizeLogger();

const LOCAL_CONFIG = [
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // ПАРОЛЬ
  {
    dialect: 'postgres',
    host: process.env.DB_HOST_LOCAL,
    post: process.env.DB_LOCAL_PORT,
    logging: (msg) => logger.info(msg),
  },
];

const LOCAL_DOCKER_CONFIG = [
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // ПАРОЛЬ
  {
    dialect: 'postgres',
    host: 'localhost',
    post: process.env.DB_PORT_FORWARDING,
    logging: (msg) => logger.info(msg),
  },
];

const DOCKER_CONFIG = [
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // ПАРОЛЬ
  {
    dialect: 'postgres',
    host: process.env.DB_HOST_DOCKER,
    post: process.env.DB_PORT,
    logging: (msg) => logger.info(msg),
  },
]

const config = process.env.NODE_ENV !== 'development' ?
  DOCKER_CONFIG :
  process.env.IS_DOCKER ?
    LOCAL_DOCKER_CONFIG :
    LOCAL_CONFIG

// @ts-ignore
export const sequelize = new Sequelize(...config)
