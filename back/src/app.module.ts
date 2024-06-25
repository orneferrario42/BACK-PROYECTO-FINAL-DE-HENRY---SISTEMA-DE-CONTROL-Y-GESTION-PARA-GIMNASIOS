import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ProfesorModule } from './profesor/profesor.module';

@Module({
  imports: [UsersModule, AuthModule, FileModule, ProfesorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
