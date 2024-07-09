// import { InjectRepository } from '@nestjs/typeorm';
// import { Notificaciones } from './entity/notificaciones.entity';
// import { Repository } from 'typeorm';

// export class NotificationRepository {
//   constructor(
//     @InjectRepository(Notificaciones)
//     private notificationRepository: Repository<Notificaciones>,
//   ) {}

//   async createNotification(
//     userId: string,
//     message: string,
//   ): Promise<Notificaciones> {
//     const notification = this.notificationRepository.create({
//       userId,
//       message,
//     });
//     return await this.notificationRepository.save(notification);
//   }
//   async getNotificationForUser(userId: string): Promise<Notificaciones[]> {
//     return await this.notificationRepository.find({ where: { userId } });
//   }
// }
