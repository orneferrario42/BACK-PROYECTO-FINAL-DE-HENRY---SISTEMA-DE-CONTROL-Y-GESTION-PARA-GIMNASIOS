import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FilesRepository } from './files.repository';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { NotificationService } from 'src/notificaciones/notification.service';
import { Express } from 'express';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FilesRepository,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profesor)
    private profesorReposotory: Repository<Profesor>,
    private readonly notificationService: NotificationService,
  ) {}
  async uploadFile(file: Express.Multer.File, userId: string) {
    const saveFile = await this.fileRepository.uploadFile(file);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profesor'],
    });
    console.log(user)
    if (!user) throw new NotFoundException(`User not found`);

    if (!user.role) {
      throw new Error('User does not have a role defined');
    }

    user.rutina = saveFile.secure_url;
    await this.userRepository.save(user);
    this.notificationService.sendNotification(userId, 'Tu rutina ha sido cargada');

    return user;
  }
  

  async profilPRofesor(file: Express.Multer.File, profesorId: string) {
    const saveFile = await this.fileRepository.uploadFile(file);
    const profesor = await this.profesorReposotory.findOne({
      where: { id: profesorId },
    });
    if (!profesor) throw new NotFoundException('profesor not found');
    profesor.perfil = saveFile.secure_url;
    const uploadFile = await this.profesorReposotory.save(profesor);
    return uploadFile;
  }

  async profilUSer(file: Express.Multer.File, userId: string) {
    const saveFile = await this.fileRepository.uploadFile(file);
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('profesor not found');
    user.perfil = saveFile.secure_url;
    const uploadFile = await this.userRepository.save(user);
    return uploadFile;
  }
}
