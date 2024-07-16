import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';
import { Admin } from 'typeorm';

@ApiTags('NOTIFICATION')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  /**
   *Este metodo permite recibir notificaciones a los usuarios
   */

  
  @Get(':userId')
  async getNotifications(userId: string) {
    return await this.notificationService.getNotificationsForUser(userId);
  }

}
