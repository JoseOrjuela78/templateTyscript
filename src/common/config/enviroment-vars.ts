import "dotenv/config";
import * as Joi from 'joi';

type EnvironmentVars = {
    APP:string;
    PORT:number;
    HOST_DB:string;
    PORT_DB:number;
    USER_DB:string;
    PASS_DB:string;
    NAME_DB:string;
    REJECTUNAUTHORIZED:number;
    SMTP_HOST:string;
    SMTP_PORT:587;
    SMTP_USER:string;
    SMTP_PASSWORD:string;
    EMAIL_FROM:string;
};

type ValidationEnvVars = {
    error: Joi.ValidationError | undefined,
    value: EnvironmentVars
};

class EnvService {
  private readonly env: EnvironmentVars;

  constructor(envVars: NodeJS.ProcessEnv) {
    const { error, value } = this.validate(envVars);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    this.env = value;
  }

  private validate(vars: NodeJS.ProcessEnv): ValidationEnvVars {
    const schema = Joi.object<EnvironmentVars>({
      APP:Joi.string().required(),
      PORT: Joi.number().integer().required(),
      HOST_DB:Joi.string().required(),
      PORT_DB:Joi.number().integer().required(),
      USER_DB:Joi.string().required(),
      PASS_DB:Joi.string().required(),
      NAME_DB:Joi.string().required(),
      REJECTUNAUTHORIZED:Joi.number().integer().min(0).max(1).required(),
      SMTP_HOST:Joi.string().required(),
      SMTP_PORT:Joi.number().integer().required(),
      SMTP_USER:Joi.string().required(),
      SMTP_PASSWORD:Joi.string().required(),
      EMAIL_FROM:Joi.string().email().required()
    }).unknown(true);

    return schema.validate(vars);
  }

  get envs(): EnvironmentVars {
    return this.env;
  };
}

// Instancia única (singleton simple)
const e = new EnvService(process.env);

export default e;