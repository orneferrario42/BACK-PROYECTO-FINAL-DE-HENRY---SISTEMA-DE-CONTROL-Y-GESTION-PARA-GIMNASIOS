import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entitites/notification.entity';
import { User } from 'src/users/entities/user.entity';
import  {NotificationController}  from './notification.controller';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway, UsersRepository],
  exports: [NotificationService],
})
export class NotificationModule {}