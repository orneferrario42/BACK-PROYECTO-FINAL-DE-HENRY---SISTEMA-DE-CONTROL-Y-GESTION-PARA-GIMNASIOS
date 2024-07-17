import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileProfesorDto } from './dto/profile-profesor.dto';
import { ProfileUserDto } from './dto/profile-user.dto';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuards } from 'src/auth/guards/roles.guards';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Express } from 'express';

@ApiTags('FILE')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  /**
   * Este metodo permite subir la imagen de la rutina de un usuario
   */
  @Post(':id')
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
            maxSize: 300000000,
            message: 'File is too large',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|doc|docx|txt|rtf|odt|html|md)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileService.uploadFile(file, userId);
  }

  /**
   * Este metodo permite subir la imagen de perfil de un usuario profesor
   */
  @Post('profileProfesor/:id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ProfileProfesorDto,
  })
  async profileProfesor(
    @Param('id') profesorId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 300000000,
            message: 'File is too large',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileService.profilPRofesor(file, profesorId);
  }

  /**
   * Este metodo permite subir la imagen de perfil de un usuario cliente
   */
  @Post('profileUser/:id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ProfileUserDto,
  })
  async profileUser(
    @Param('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 300000,
            message: 'File is too large',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileService.profilPRofesor(file, userId);
  }
}
