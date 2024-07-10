import { Injectable } from '@nestjs/common';
import { AvisosGateway } from './avisos.gateway';

@Injectable()
export class AvisosService {
  constructor(private avisossGateway: AvisosGateway) {}

  sendAvisos(userId: string, message: string): void {
    const avisos = {
      message,
      timestamp: new Date(),
    };
    this.avisossGateway.sendAvisosToUser(userId, avisos);
  }

  sendavisosToAll(message: string): void {
    const avisos = {
      message,
      timestamp: new Date(),
    };
    this.avisossGateway.sendAvisosToAll(avisos);
  }
}