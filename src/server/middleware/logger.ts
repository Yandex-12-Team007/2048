import path from 'path';
import winston from 'winston';
import expressWinston from 'express-winston';

export function logger() {
  return expressWinston.logger({
    transports: [
      new winston.transports.File({
        filename: path.join('logs', 'main.log'),
        level: 'info',
      }),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function(req, res) {
      return false;
    },
  })
}

export function errorLogger() {
  return expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        filename: path.join('logs', 'error.log'),
        level: 'error',
      }),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
  });
}

export function sequelizeLogger() {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
      new winston.transports.File({
        filename: path.join('logs', 'sequelize-error.log'),
        level: 'error',
      }),
      new winston.transports.File({
        filename: path.join('logs', 'sequelize-info.log'),
        level: 'info',
      }),
      new winston.transports.File({
        filename: path.join('logs', 'sequelize-combined.log'),
      }),
    ],
  });
}
