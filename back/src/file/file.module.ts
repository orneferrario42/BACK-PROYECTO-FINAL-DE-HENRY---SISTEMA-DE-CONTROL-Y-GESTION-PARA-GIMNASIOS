import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { CloudinaryConfig } from '../config/cloudinary';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FilesRepository } from './files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [FileController],



providers: [FileService,CloudinaryConfig,FilesRepository],

})
export class FileModule {}
