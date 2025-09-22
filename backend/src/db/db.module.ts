import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CsvRecord } from '../model/csv-record.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: parseInt(config.get('DB_PORT', '3306')),
        username: config.get('DB_USER', 'datagate'),
        password: config.get('DB_PASS', 'datagatepass'),
        database: config.get('DB_NAME', 'datagate'),
        entities: [CsvRecord],
        synchronize: true, // disable in production
      }),
    }),
    TypeOrmModule.forFeature([CsvRecord]),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
