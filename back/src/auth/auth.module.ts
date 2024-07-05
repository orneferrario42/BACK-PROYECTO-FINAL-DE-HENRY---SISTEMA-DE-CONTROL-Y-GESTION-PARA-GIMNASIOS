import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ProfesorService } from 'src/profesor/profesor.service';
import { PlanRepository } from 'src/plan/plan.repository';
import { PlanService } from 'src/plan/plan.service';
import { PlanModule } from 'src/plan/plan.module';
import { Plan } from 'src/plan/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profesor, Plan]),
  forwardRef(() => PlanModule),],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ProfesorService, UsersRepository ],
})
export class AuthModule {}
