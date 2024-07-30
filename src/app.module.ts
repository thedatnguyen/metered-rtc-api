import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLoggerMiddleware } from './utils/logger';
import { DomainKeyCheckMiddleware } from './middlewares/domain-key-check.middleware.ts';
import { AuthModule } from './modules/auth/auth.module';
import { RoomModule } from './modules/room/room.module';
import { TokenModule } from './modules/token/token.module';

@Module({
  imports: [AuthModule, RoomModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AppLoggerMiddleware)
      .forRoutes('*')
      .apply(DomainKeyCheckMiddleware)
      .forRoutes('*');
  }
}
