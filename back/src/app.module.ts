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
import { PlanModule } from './plan/plan.module';
import { NotificationsModule } from './notifications/notifications.module';
// import * as cors from 'cors';


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
    SeederModule,
    // NotificationsModule,

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),

    // JwtModule.register({global:true, secret: process.env.JWT_SECRET, signOptions:{expiresIn:'24h'}},),
    PlanModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: 'http://localhost:3000', // Reemplaza con el origen de tu frontend
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
          credentials: true,
          allowedHeaders: [
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods',
            'x-requested-with',
            'Access-Control-Allow-Headers',
            'authorization',
            'content-type',
          ],
        }),
      )
      .forRoutes('*');
  }
}
