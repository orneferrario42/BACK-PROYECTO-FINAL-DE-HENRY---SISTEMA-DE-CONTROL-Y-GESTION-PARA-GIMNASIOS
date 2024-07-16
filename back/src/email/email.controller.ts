import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './services/email/email.service';
import { SendEmailDto } from './dtos/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  /***
   *Este metodo verifica si el correo se envio al cliente
   */
  @Get('health')
  async healthCheck(@Res() res: Response) {
    try {
      const response = await this.emailService.healthCheck();
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }

  /***
   * Este metodo permite enviar un correo a un cliente avisando que esta proximo a vencer su plan
   */
  @Post('send-email')
  async sendEmail(@Body() body: SendEmailDto, @Res() res: Response) {
    try {
      const response = await this.emailService.sendEmail(body);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }
}
