import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avisos } from './entity/avisos.entity';
import { AvisosGateway } from './avisos.gateway';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AvisosService {
  
  constructor(
    @InjectRepository(Avisos)
    private avisosRepository: Repository<Avisos>,
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private avisossGateway: AvisosGateway
  ) {}

  async sendavisosToAll(message: string): Promise<void> {
    // Fetch all users from the database
    const users = await this.userRepository.find();

    // Create a new aviso for each user
    const avisosToSave = users.map(user => {
      const aviso = new Avisos();
      aviso.message = message;
      aviso.user = user; // Ensure user entity is set
      return aviso;
    });

    // Save all avisos to the database
    await this.avisosRepository.save(avisosToSave);
  }

  getAll() {
    return this.avisosRepository.find();
  }
}