import 'dotenv/config';

import * as joi from 'joi';

type EnvironmentVariables = {
  PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: string;

 };

type ValidationEnvironmentVariables = {
  error: joi.ValidationError | undefined;
  value: EnvironmentVariables;
};

function validateEnvironmentVariables(vars: Record<string, any>) {// Record utilitario para validar esturctura json => [{string:any}]
  // {[key: string]: any}
  const envSchema = joi
    .object({
      PORT: joi.number().integer().required(),
      DB_HOST: joi.string().required(),
      DB_USER: joi.string().required(),
      DB_PASS: joi.string().required(),
      DB_NAME: joi.string().required(),
      ACCESS_TOKEN_SECRET: joi.string().required(),
      ACCESS_TOKEN_EXPIRES_IN: joi.string().required()
    })
    .unknown(true); //solo valida variables que esten en el esquema

  const { error, value } = envSchema.validate(vars);
  return { error, value };
}

function loadEnvironmentVariables() {
  const result: ValidationEnvironmentVariables = validateEnvironmentVariables(
    process.env,
  );

  if (result.error)
    throw new Error(`Config validation error: ${result.error.message}`);

  const value = result.value;

  return {
    port: value.PORT,
    db: {
          user  : value.DB_USER,
      password  : value.DB_PASS,
      database  : value.DB_NAME,
        server  : value.DB_HOST,
        pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
      options: {
        encrypt: false, // for azure
        trustServerCertificate: false, // change to true for local dev / self-signed certs
        enableArithAbort: false
      }
    },
    accesTokenSecret: value.ACCESS_TOKEN_SECRET,
    accesTokenExpiresIn: value.ACCESS_TOKEN_EXPIRES_IN
  };
}

export const envs = loadEnvironmentVariables();