import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entitites/notification.entity';
import { User } from 'src/users/entities/user.entity';
import  {NotificationController}  from './notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService],
})
export class NotificationModule {}