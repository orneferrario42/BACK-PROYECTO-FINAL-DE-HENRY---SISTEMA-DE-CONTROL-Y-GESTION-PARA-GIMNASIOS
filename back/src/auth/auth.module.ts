import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ProfesorService } from 'src/profesor/profesor.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profesor])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, UsersService, ProfesorService],
})
export class AuthModule {}
