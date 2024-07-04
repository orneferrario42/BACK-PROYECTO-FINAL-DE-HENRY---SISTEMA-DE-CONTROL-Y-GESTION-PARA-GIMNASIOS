import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { CloudinaryConfig } from '../config/cloudinary';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FilesRepository } from './files.repository';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profesor])],
  controllers: [FileController],
  providers: [FileService, CloudinaryConfig, FilesRepository],
})
export class FileModule {}
