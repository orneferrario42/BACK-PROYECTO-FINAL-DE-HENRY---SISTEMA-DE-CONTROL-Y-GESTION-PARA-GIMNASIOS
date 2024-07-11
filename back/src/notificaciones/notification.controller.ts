import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Get(':userId')
    async getNotifications(@Param('userId') userId: string) {
        return await this.notificationService.getNotificationsForUser(userId);
    }

    @Patch(':id/read')
    async markAsRead(@Param('id') id: string) {
        await this.notificationService.markAsRead(id);
    }
}