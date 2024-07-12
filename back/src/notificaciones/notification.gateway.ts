import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        let userId = client.handshake.query.userId;
        if (Array.isArray(userId)){
        userId = userId[0]
        }
        client.join(userId);
    }

    handleDisconnect(client: Socket) {
        // const userId = Array.isArray(client.handshake.query.userId) ? client.handshake.query.userId[0] : client.handshake.query.userId;
        let userId = client.handshake.query.userId;
        if (Array.isArray(userId)){
            userId = userId[0]
        }
        client.leave(userId);
    }

    sendNotification(userId: string, message: string) {
        console.log('Si vemos esto es porque se envio la rutina con exito ♥')
        this.server.to(userId).emit('Tu profe ha subido tu rutina', message);
    }
}