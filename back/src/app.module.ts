import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PagosModule } from './pagos/pagos.module';
import { SeederModule } from './seeder/seeder.module';
import { JwtModule } from '@nestjs/jwt';
import cors from 'cors';
import { AvisosModule } from './avisos/avisos.module';
import { NotificationModule } from './notificaciones/notification.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { PlanModule } from './plan/plan.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    AuthModule,
    ProfesorModule,
    PlanModule,
    PagosModule,
    FileModule,
    AvisosModule,
    NotificationModule,
    ChatbotModule,
    SeederModule,
    ScheduleModule.forRoot(),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        // cors({
        //   origin: [
        //     'https://pf-henry-front-rouge.vercel.app',
        //     /https:\/\/pf-henry-front-.*\.vercel\.app$/,
        //     'http://localhost:3000',
        //   ],
        //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        //   credentials: true,
        //   allowedHeaders: [
        //     'Access-Control-Allow-Origin',
        //     'Access-Control-Allow-Methods',
        //     'x-requested-with',
        //     'Access-Control-Allow-Headers',
        //     'authorization',
        //     'content-type',
        //   ],
        // }),
      )
      .forRoutes('*');
  }
}
