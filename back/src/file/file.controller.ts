import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('uploadFile/:id')
  @UseInterceptors(FileInterceptor('rutina'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateFileDto,
  })
  async uploadFile(
    @Param('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 300000,
            message: 'File is too large',
          }),
          new FileTypeValidator({
            fileType: /(pdf|doc|docx|txt|rtf|odt|html|md)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileService.uploadFile(file, userId);
  }
}
