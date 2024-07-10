// import { Module } from '@nestjs/common';
// import { NotificationsService } from './notifications.service';
// import { NotificationsGateway } from './notifications.gateway';
// import { NotificationsController } from './notifications.controller';
// import { notificationRepository } from './notifications.repository';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Notificaciones } from './entity/notificaciones.entity';
// import { User } from 'src/users/entities/user.entity';
// import { UsersService } from 'src/users/users.service';

// @Module({
//   imports: [TypeOrmModule.forFeature([Notificaciones, User])],
//   controllers: [NotificationsController],
//   providers: [
//     NotificationsService,
//     NotificationsGateway,
//     {
//       provide: 'NotificationRepository',
//       useClass: notificationRepository,
//     },
//     notificationRepository,
//     UsersService,
//   ],
// })
// export class NotificationsModule {}
