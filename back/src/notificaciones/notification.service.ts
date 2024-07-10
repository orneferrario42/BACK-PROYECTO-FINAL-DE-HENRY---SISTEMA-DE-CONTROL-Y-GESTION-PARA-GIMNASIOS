import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  sendNotification(userId: string, message: string) {
    this.notificationGateway.sendNotification(userId, message);
  }
}
