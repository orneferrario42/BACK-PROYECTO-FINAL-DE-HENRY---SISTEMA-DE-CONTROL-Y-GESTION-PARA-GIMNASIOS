import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvisosService } from './avisos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AVISOS')
@Controller('avisos')
export class AvisosController {
  constructor(private avisosService: AvisosService) {}
  /***
   * Este metodo permite al administador hacer avisos a todos los usuaros
   */
  @Post('enviarAtodos')
  async sendToAll(
    @Body('message') message: string,
    @Body('durationInHours') durationInHours: number,
  ) {
    await this.avisosService.sendavisosToAll(message, durationInHours);
    return { message };
  }
  /***
   * Este metodo permite ver a los usuarios clientes ver las notificaciones
   */
  @Get()
  async getValidAvisos() {
    return this.avisosService.getValidAvisos();
  }
}
