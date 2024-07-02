import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { CloudinaryConfig } from '../config/cloudinary';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [FileService,CloudinaryConfig],
})
export class FileModule {}
