import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [UsersModule, AuthModule, FileModule, ProfesorModule, PagosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
