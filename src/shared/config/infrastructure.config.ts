import { getEnvNumber, getEnvStr } from './environments.private'
import type { ENV } from './infrastructure.type.private'

export const GlobalConfig = Object.freeze({
  ENVIRONMENT: <ENV>getEnvStr('NODE_ENV', 'development'),
  IS_TEST: getEnvStr('NODE_ENV', 'development') === 'test',
  IS_DEVELOPMENT: getEnvStr('NODE_ENV', 'development') === 'development',
  IS_PRODUCTION: getEnvStr('NODE_ENV', 'development') === 'production',
  PORT: getEnvNumber('PORT', 5000)
})

export const GlobalAppConfig = Object.freeze({
  APP_NAME: getEnvStr('APP_NAME', 'est-app')
})

export const GlobalJWTConfig = Object.freeze({
  JWT_SECRET: getEnvStr('JWT_SECRET', 'jwtSecretPassphrase'),
  JWT_EXPIRATION: getEnvNumber('JWT_EXPIRATION', 1),
  JWT_REFRESH_EXPIRATION: getEnvNumber('JWT_REFRESH_EXPIRATION', 7)
})

export const GlobalDBConfig = Object.freeze({
  DB_USER: getEnvStr('DB_USER', 'mars-user'),
  DB_PASSWORD: getEnvStr('DB_PASSWORD', 'est-password'),
  DB_HOST: getEnvStr('DB_HOST', 'localhost'),
  DB_PORT: getEnvNumber('DB_PORT', 5432),
  DB_NAME: getEnvStr('DB_NAME', 'est-db'),
  DB_URL: getEnvStr('DB_URL', 'postgresql://mars-user:mars-password@localhost:5432/est-db')
})
