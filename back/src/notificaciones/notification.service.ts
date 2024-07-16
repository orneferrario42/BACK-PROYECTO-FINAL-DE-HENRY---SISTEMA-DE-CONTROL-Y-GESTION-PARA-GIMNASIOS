import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { Notification } from './entitites/notification.entity';
import { NotificationGateway } from './notification.gateway';
import { Role } from 'src/enum/roles.enum';
import { User } from '../users/entities/user.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private readonly notificationGateway: NotificationGateway,
    
  ) {}

  async sendNotification(userId: string, message: string) {
    const notification = new Notification();
    notification.message = message;
    notification.createdAt = new Date();
    notification.user = { id: userId } as any; // Cast to avoid needing full user entity

    await this.notificationRepository.save(notification);
    this.notificationGateway.sendNotification(userId, message);
  }
  async sendNotificationProfesor(userId: string, profesorId: string) {
    const profesor =  await this.profesorRepository.findOne({
      where: { id: profesorId },
    })
    const user =await this.userRepository.findOne({
      where: { id: userId },
    })
    if ( !user) {
      throw new Error('No se encontró al usuario');
    }

    //notificacion al profesor 
    const notification = new Notification();
    notification.message = `El usuario ${user.name} se ha registrado en tu clase.`;
    notification.createdAt = new Date();
    notification.profesor =  profesor

    this.notificationRepository.save(notification);
    this.notificationGateway.sendNotificationProfesor(profesor.id, notification.message);
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

  async getNotificationsForUser(userId: string) {
    const notification = await this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  
    return notification;
  }


  async markAsRead(notificationId: string) {
    await this.notificationRepository.update(notificationId, { read: true });
  }
}
