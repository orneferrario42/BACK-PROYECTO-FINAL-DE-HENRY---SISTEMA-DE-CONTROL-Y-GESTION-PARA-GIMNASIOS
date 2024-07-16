import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Role } from 'src/enum/roles.enum';

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

    private activateUsers: Map<string, string> = new Map();

    afterInit(server: Server) {
        console.log('Notification gateway inicializado');
    }

    handleConnection(client: Socket) {
        let userId = client.handshake.query.userId;
        if (Array.isArray(userId)) {
            userId = userId[0]
        }
        client.join(userId);
    }

    handleDisconnect(client: Socket) {
        // const userId = Array.isArray(client.handshake.query.userId) ? client.handshake.query.userId[0] : client.handshake.query.userId;
        let userId = client.handshake.query.userId;
        if (Array.isArray(userId)) {
            userId = userId[0]
        }
        client.leave(userId);
    }

    sendNotification(userId: string, message: string) {
        console.log('Si vemos esto es porque se envio la rutina con exito ♥')
        this.server.to(userId).emit('Tu profe ha subido tu rutina', message);
    }
    async sendNotificationProfesor(profesorId: string, message: string) {
        const socketId =  this.activateUsers.get(profesorId);
        if (socketId) {
            this.server.to(socketId).emit('notification', message);
            console.log(`Notificación enviada al profesor ${profesorId}: ${message}`);
        } else {
            console.log(`Profesor con id ${profesorId} no está conectado`);
        }
    }
    sendNotificationAdmin(admin = Role.Admin) {
        console.log('♥♥♥♥ Si vemos esto es porque se envio el pagoo ♥♥♥♥')
        this.server.to(admin).emit('Se ha registrado un pago');
    }
}