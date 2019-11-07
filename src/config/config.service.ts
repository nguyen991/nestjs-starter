import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    this.envConfig = parse(readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get mongoDB(): string {
    return this.envConfig.MONGO_DB;
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }
}
