import "dotenv/config";
import * as Joi from 'joi';

type EnvironmentVars = {
    PORT:number;
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
      PORT: Joi.number().integer().required(),
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


/*
const validatorEnviromentVars = (vars: Record<string,any>) =>{
    const envSchema = Joi.object({
        PORT: Joi.number().integer().required()
    }).unknown(true);

    const {error, value} = envSchema.validate(vars);
    return {error, value};
};

const loadEnviromentVariables = () =>{
    const result:validationEnvVars = validatorEnviromentVars(process.env);
    
    if(result.error){
        throw new Error(`Config validation error: ${result.error.message}`);
    }; 

    const value = result.value;

    return {
        port: value.PORT
    };
};

const envs = loadEnviromentVariables();

export default envs;
*/
