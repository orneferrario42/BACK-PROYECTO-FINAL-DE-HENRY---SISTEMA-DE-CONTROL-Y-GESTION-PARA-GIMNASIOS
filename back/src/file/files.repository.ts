import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FilesRepository {
  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => (error ? reject(error) : resolve(result)),
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
