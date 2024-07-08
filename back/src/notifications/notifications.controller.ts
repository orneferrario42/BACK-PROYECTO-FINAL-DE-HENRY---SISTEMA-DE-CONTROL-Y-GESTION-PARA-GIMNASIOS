import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  // @Post('rutinaSubida')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadRoutine(@UploadedFile() file, @Body('userId') userId: string) {

  //     this.notificationsService.sendNotification(userId, 'Tu profesor ha subido una nueva rutina');

  //     return { message: 'Rutina subida con éxito' };
  // }
  @Post('sentToUser')
  async sendToUser(
    @Body('userId') userId: string,
    @Body('message') message: string,
  ) {
    await this.notificationsService.sendNotification(userId, message);
    return { message: 'Notification sent to user' };
  }

  @Post('sendToAll')
  async sendToAll(@Body('message') message: string) {
    await this.notificationsService.sendNotificationToALL(message);
    return { message: 'Notification sent to all users' };
  }
  @Get(':id')
  async getUserNotifications(@Param('userId') userId: string) {
    const notifications =
      await this.notificationsService.getUserNotification(userId);
    return notifications;
  }
}
