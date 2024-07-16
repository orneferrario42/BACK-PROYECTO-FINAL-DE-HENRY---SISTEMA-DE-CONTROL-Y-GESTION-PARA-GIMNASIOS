import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ProfesorService } from 'src/profesor/profesor.service';
import { PlanModule } from 'src/plan/plan.module';
import { Plan } from 'src/plan/entities/plan.entity';
import { Notification } from 'src/notificaciones/entitites/notification.entity';
import { NotificationModule } from 'src/notificaciones/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profesor, Plan, Notification]),
PlanModule, NotificationModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ProfesorService, UsersRepository  ],
})
export class AuthModule {}
