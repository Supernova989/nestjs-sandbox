import { join } from 'path';
import { plainToClass } from 'class-transformer';
import * as dotenv from 'dotenv';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

dotenv.config({
  debug: true,
  path: join(__dirname, '..', '..', '.env'),
});

class EnvironmentVariables {
  constructor(values: EnvironmentVariables) {
    for (const key in values) {
      this[key] = values[key];
    }
  }

  @IsNumber()
  @IsNotEmpty()
  readonly PORT!: number;

  @IsString()
  @IsNotEmpty()
  readonly SECRET!: string;

  @IsString()
  @IsNotEmpty()
  readonly MONGO_DB_CONNECTION!: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export const config: EnvironmentVariables = {
  PORT: parseInt(process.env.PORT),
  SECRET: process.env.SECRET,
  MONGO_DB_CONNECTION: process.env.MONGO_DB_CONNECTION,
};

export const configFactory = () => new EnvironmentVariables(config);
