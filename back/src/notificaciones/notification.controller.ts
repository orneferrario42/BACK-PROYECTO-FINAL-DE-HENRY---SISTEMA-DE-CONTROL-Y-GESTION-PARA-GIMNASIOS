import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('NOTIFICATION')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   *Este metodo permite mandar notificaciones a los usuarios
   */
  @Get(':userId')
  async getNotifications(@Param('userId') userId: string) {
    return await this.notificationService.getNotificationsForUser(userId);
  }

  /**
   * este metodo permite actualizar las notificaciones
   */
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    await this.notificationService.markAsRead(id);
  }
}
