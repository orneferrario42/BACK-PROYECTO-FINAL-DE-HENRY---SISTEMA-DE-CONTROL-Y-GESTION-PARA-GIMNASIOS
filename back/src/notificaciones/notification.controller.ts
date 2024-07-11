import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Get(':userId')
    async getNotifications(@Param('userId') userId: string) {
        return await this.notificationService.getNotificationsForUser(userId);
    }
}