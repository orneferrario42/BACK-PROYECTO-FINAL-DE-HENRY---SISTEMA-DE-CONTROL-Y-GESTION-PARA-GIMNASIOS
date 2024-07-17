// import { Injectable } from '@nestjs/common';
// import { NotificationGateway } from './notification.gateway';

// @Injectable()
// export class NotificationService {
//   constructor(private readonly notificationGateway: NotificationGateway) {}

//   sendNotification(id: string, message: string) {
//     this.notificationGateway.sendNotification(id, message);
//   }
// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { Notification } from './entitites/notification.entity';
import { NotificationGateway } from './notification.gateway';
import { Role } from 'src/enum/roles.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private readonly notificationGateway: NotificationGateway,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async sendNotification(userId: string, message: string) {
    const notification = new Notification();
    notification.message = message;
    notification.createdAt = new Date();
    notification.user = { id: userId } as any; // Cast to avoid needing full user entity

    await this.notificationRepository.save(notification);
    this.notificationGateway.sendNotification(userId, message);
  }

  async sendNotificationAdmin(message: string) {
    const admin = await this.userRepository.findOne({
      where: { role: Role.Admin },
    });

    if (!admin) {
      throw new Error('No se encontró al administrador');
    }

    const notification = new Notification();
    notification.message = message;
    notification.createdAt = new Date();
    notification.user = admin;

    await this.notificationRepository.save(notification);
    this.notificationGateway.sendNotification(admin.id, message);
  }

  async getNotificationsForUser(userId: string, page: number, limit: number) {
    let notification = await this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    notification = notification.slice(start, end);
    return notification;
  }


  async markAsRead(notificationId: string) {
    await this.notificationRepository.update(notificationId, { read: true });
  }
}
