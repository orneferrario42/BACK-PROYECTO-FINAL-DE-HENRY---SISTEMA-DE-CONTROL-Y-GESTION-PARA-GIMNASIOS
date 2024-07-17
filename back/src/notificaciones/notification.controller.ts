import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';
import { Admin } from 'typeorm';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   *Este metodo permite recibir notificaciones a los usuarios
   */
  @Get(':userId')
  async getNotifications(
    @Param('userId') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    if (page && limit) {
      return await this.notificationService.getNotificationsForUser(
        userId,
        page,
        limit,
      );
    }
    return await this.notificationService.getNotificationsForUser(userId, 1, 8);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return await this.notificationService.markAsRead(id);
  }

}
