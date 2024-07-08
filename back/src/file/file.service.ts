import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FilesRepository } from './files.repository';
import { Repository } from 'typeorm';
import { Role } from 'src/enum/roles.enum';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FilesRepository,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profesor)
    private profesorReposotory: Repository<Profesor>,
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

    // Permitir que tanto profesores como administradores suban archivos
    // if (user.role !== Role.Profesor || Role.Admin) {
    //   throw new ForbiddenException(
    //     'Only professors and admins can upload files',
    //   );
    // }
    // if (user.profesor) {
    //   const profesorRole = user.profesor.role;
    //   if (profesorRole !== Role.Profesor) {
    //     throw new ForbiddenException("Only profesdors can upload files");
    //       }
    // }

    user.rutina = saveFile.secure_url;
    await this.userRepository.save(user);
    return user;
  }
  // async uploadFile(file: Express.Multer.File, userId: string) {
  //   const saveFile = await this.fileRepository.uploadFile(file);
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: ['profesor'],
  //   });
  //   if (!user) throw new NotFoundException(`User not found`);

  //   // if (user.profesor.role !== Role.Profesor) {
  //   //   throw new ForbiddenException('Only profesdors can upload files');
  //   // }
  //   if (!user.role) {
  //     throw new Error('User does not have a role defined');
  //   }
  //   user.rutina = saveFile.secure_url;
  //   await this.userRepository.save(user);
  //   return user;
  // }

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
