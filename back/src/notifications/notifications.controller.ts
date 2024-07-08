import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
constructor(private notificationsService: NotificationsService) {}


@Post('rutinaSubida')
@UseInterceptors(FileInterceptor('file'))
uploadRoutine(@UploadedFile() file, @Body('userId') userId: string) {
    
    this.notificationsService.sendNotification(userId, 'Tu profesor ha subido una nueva rutina');

    return { message: 'Rutina subida con éxito' };
}
}
