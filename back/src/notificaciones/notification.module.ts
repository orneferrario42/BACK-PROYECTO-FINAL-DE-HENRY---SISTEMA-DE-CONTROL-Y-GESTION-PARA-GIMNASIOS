import { forwardRef, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entitites/notification.entity';
import { User } from 'src/users/entities/user.entity';
import  {NotificationController}  from './notification.controller';
import { UsersRepository } from 'src/users/users.repository';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ProfesorModule } from 'src/profesor/profesor.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User, Profesor]), ProfesorModule,],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway, UsersRepository],
  exports: [NotificationService],
})
export class NotificationModule {}