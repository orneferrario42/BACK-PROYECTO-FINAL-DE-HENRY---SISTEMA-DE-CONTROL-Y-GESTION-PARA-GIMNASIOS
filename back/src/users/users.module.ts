import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PlanRepository } from 'src/plan/plan.repository';
import { Plan } from 'src/plan/entities/plan.entity';
import { ProfesorService } from 'src/profesor/profesor.service';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { NotificationModule } from 'src/notificaciones/notification.module';
import { AvisosModule } from 'src/avisos/avisos.module';


@Module({
  imports: [TypeOrmModule.forFeature([User, Plan, Profesor]), NotificationModule,AvisosModule],
  controllers: [UsersController],

  providers: [
    UsersService,
    PlanRepository,
    ProfesorService,
    

    
  ],

  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(requiresAuth()).forRoutes('users');
  }
}
