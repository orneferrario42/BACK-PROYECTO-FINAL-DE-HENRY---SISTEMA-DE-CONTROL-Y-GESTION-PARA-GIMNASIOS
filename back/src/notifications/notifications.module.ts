import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsController } from './notifications.controller';

@Module({
  providers: [NotificationsService, NotificationsGateway],
  controllers: [NotificationsController],
})
export class NotificationsModule {}

