import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { IsNotEmpty, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class EnvConfig {
  @IsNotEmpty()
  API_KEY: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const parsedConfig = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validate(parsedConfig);
  }

  private validate(parsedConfig: dotenv.DotenvParseOutput): EnvConfig {
    const config = plainToClass(EnvConfig, parsedConfig);
    const errors = validateSync(config);
    if (errors.length > 0) {
      throw errors;
    }
    return config;
  }

  get apiKey(): string {
    return this.envConfig.API_KEY;
  }
}
