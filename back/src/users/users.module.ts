import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { requiresAuth } from 'express-openid-connect';
import { RolesGuards } from 'src/auth/guards/roles.guards';
import { PlanRepository } from 'src/plan/plan.repository';
import { Plan } from 'src/plan/entities/plan.entity';
import { ProfesorService } from 'src/profesor/profesor.service';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { notificationRepository } from 'src/notifications/notifications.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plan, Profesor])],
  controllers: [UsersController],
  providers: [UsersService, PlanRepository, ProfesorService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(requiresAuth()).forRoutes('users');
  }
}
