import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
constructor(private notificationsGateway: NotificationsGateway) {}

sendNotification(userId: string, message: string): void {
    const notification = {
    message,
    timestamp: new Date(),
    };
    this.notificationsGateway.sendNotificationToUser(userId, notification);
}
}
