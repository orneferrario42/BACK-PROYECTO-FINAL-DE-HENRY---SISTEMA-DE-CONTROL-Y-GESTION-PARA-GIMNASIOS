import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvisosService} from './avisos.service';

@Controller('avisos')
export class AvisosController {
  constructor(private avisosService: AvisosService) {}

  @Post('rutinaSubida')
  @UseInterceptors(FileInterceptor('file'))
  uploadRoutine(@UploadedFile() file, @Body('userId') userId: string, @Body('message') message: string) {
    this.avisosService.sendAvisos(userId, message);
    return { message };
  }

  @Post('sendToAll')
  sendToAll(@Body('message') message: string) {
    this.avisosService.sendavisosToAll(message);
    return { message };
  }
}