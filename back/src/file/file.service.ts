import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FilesRepository } from './files.repository';

@Injectable()
export class FileService {
  // constructor(
  //   private readonly fileRepository: FilesRepository, // este Filerepository aun no existe ---> le corresponde a ENRRIQUE
  //   @InjectRepository(User) private userRepository: Repository<User>,
  // ) {}

  // async uploadFile(file: Express.Multer.File, userId: string) {}
  // create(createFileDto: CreateFileDto) {
  //   const saveFile = await this.userRepository.uploadFile(file);
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //   });
  //   if (!user) throw new NotFoundException(`User not found`);
  // }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
