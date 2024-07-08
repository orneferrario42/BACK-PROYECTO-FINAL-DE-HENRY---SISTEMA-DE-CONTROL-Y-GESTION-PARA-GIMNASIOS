import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { notificationRepository } from './notifications.repository';
import { Notificaciones } from './entity/notificaciones.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private notificationsGateway: NotificationsGateway,
    private notificationRepository: notificationRepository,
  ) {}

  async sendNotification(userId: string, message: string): Promise<void> {
    const notification = await this.notificationRepository.createNotification(
      userId,
      message,
    );
    this.notificationsGateway.sendNotificationToUser(userId, notification);
  }

  async sendNotificationToALL(message: string): Promise<void> {
    const notification = {
      message,
      timestamp: new Date(),
    };
    this.notificationsGateway.sendNotificationToAll(notification);
  }

  async getUserNotification(userId: string): Promise<Notificaciones[]> {
    return await this.notificationRepository.getNotificationForUser(userId);
  }
}
