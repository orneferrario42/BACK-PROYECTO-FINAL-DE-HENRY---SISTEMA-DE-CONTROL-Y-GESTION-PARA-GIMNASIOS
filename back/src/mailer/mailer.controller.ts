import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { Subject } from 'rxjs';
import { SendEmailDto } from './mailer.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
  /***
   * Este metodo permite enviar un correo avisando que le quedan 5 días de mensualidad
   */
  @Post()
  async sendMailer(@Body() sendEmailDto: SendEmailDto) {
    const { from, recipients, subject, html } = sendEmailDto;
    const dto: SendEmailDto = {
      from: from,
      recipients: [
        { name: recipients[0].name, address: recipients[0].address },
      ],
      subject: subject,
      html: html,
    };
    return this.mailerService.sendEmail(sendEmailDto);
  }
}
