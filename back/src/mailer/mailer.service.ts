import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer'
import { SendEmailDto } from './mailer.interface';
import Mail from 'nodemailer/lib/mailer';
import * as tls from 'tls';

@Injectable()
export class MailerService {
    constructor(private readonly configService:ConfigService){}


    async mailTransport(){
       const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: false, 
            auth: {
              user: this.configService.get<string>('MAIL_USERNAME'),
              pass: this.configService.get<string>('MAIL_PASSWORD'),
            },
            tls: {
              minVersion: 'TLSv1.2',
              maxVersion: 'TLSv1.3',
              rejectUnauthorized: false, 
            },          
          // logger: true,
          // debug: true 
          });
          return transporter;
    }

    async sendEmail(dto:SendEmailDto){
      const {from,recipients,subject,html,placeholderReplacements}=dto;
      const transporter = await this.mailTransport();
      const options:Mail.Options = {
          from:from ??{
            name:this.configService.get<string>('APP_NAME'),
            address:this.configService.get<string>('DEFAULT_MAIL_FROM')
          },
          to: recipients, 
          subject,
          html
      }
      try {
        await transporter.verify();
        console.log('Conexión al servidor de correo establecida correctamente');
        const result = await transporter.sendMail(options)
        return result
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        if (error.code === 'ESOCKET') {
          console.error('Error de conexión SSL/TLS. Verifica la configuración del servidor y los puertos.');
        }
        throw error; 
     
      }
    
    }
}
