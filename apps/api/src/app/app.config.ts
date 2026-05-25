import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;

export const environmentValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  API_PORT: Joi.number().port().optional(),
  PORT: Joi.number().port().default(DEFAULT_PORT),
  DATABASE_URL: Joi.string().required(),
});

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.API_PORT ?? process.env.PORT ?? DEFAULT_PORT),
  databaseUrl: process.env.DATABASE_URL as string,
}));
