import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

function DatabaseOrmModule(): DynamicModule {
  const { envs } = new ConfigService();
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: ['**/**.entity{.ts,.js}'],
  });
}

@Global()
@Module({
  imports: [ConfigModule, DatabaseOrmModule()],
})
export class DatabaseModule {}
