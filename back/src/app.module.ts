import { Module } from '@nestjs/common';
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
    FileModule,
    ProfesorModule,
    PagosModule,
    SeederModule,
    JwtModule.register({global:true, secret: process.env.JWT_SECRET, signOptions:{expiresIn:'24h'}},),
  ],
  

  controllers: [],
  providers: [],
})
export class AppModule {}
