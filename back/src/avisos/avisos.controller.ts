import { Controller, Post, Body, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvisosService} from './avisos.service';

@Controller('avisos')
export class AvisosController {
  constructor(private avisosService: AvisosService) {}

  
  @Post('enviarAtodos')
  async sendToAll(@Body('message') message: string, @Body('durationInHours') durationInHours: number) {
    await this.avisosService.sendavisosToAll(message,durationInHours);
    return { message };
  }

  @Get()
  async getValidAvisos() {
    return this.avisosService.getValidAvisos();
  }
}