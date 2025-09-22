import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';
import { CsvService } from './service/csv.service';
import { LoggerService } from './service/logger.service';
import { AppService } from './service/app.service';
import { AppController } from './controller/app.controller';
import { CsvController } from './controller/csv.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [ConfigModule, DbModule],
  controllers: [AppController, CsvController],
  providers: [AppService, CsvService, LoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // ✅ Apply LoggerMiddleware globally
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
