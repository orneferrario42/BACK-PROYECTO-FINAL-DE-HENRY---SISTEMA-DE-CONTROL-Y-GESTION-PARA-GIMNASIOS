import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class NotificationsGateway {
  @WebSocketServer() server: Server;
  private userSockets: Map<string, Socket> = new Map();

  @SubscribeMessage('register')
  handleRegister(@ConnectedSocket() client: Socket, payload: string): void {
    this.userSockets.set(payload, client);
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
}
