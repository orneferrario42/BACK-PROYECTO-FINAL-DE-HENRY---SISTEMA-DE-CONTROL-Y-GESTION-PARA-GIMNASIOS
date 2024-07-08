import { Inject } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from './notifications.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost.3001',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class NotificationsGateway {
  constructor(private notificactionesService: NotificationsService) {}
  @WebSocketServer() server: Server;
  private userSockets: Map<string, Socket> = new Map();

  @SubscribeMessage('register')
  async handleRegister(@ConnectedSocket() client: Socket, payload: string) {
    this.userSockets.set(payload, client);
    const notifications =
      await this.notificactionesService.getUserNotification(payload);
    notifications.forEach((notification) => {
      client.emit('new  notification', notifications);
    });
  }

  handleDisconnect(client: Socket) {
    this.userSockets.forEach((socket, userId) => {
      if (socket === client) {
        this.userSockets.delete(userId);
      }
    });
  }

  sendNotificationToUser(userId: string, notification: any): void {
    const userSocket = this.userSockets.get(userId);
    if (userSocket) {
      userSocket.emit('newNotification', notification);
    }
  }
  sendNotificationToAll(notification: any): void {
    this.userSockets.forEach((Socket) => {
      Socket.emit('new notification', notification);
    });
  }
}
