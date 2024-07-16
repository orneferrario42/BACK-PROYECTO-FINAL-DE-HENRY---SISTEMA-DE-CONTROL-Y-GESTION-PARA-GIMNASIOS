import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { CrearPagoDto } from './dto/create-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../plan/entities/plan.entity';
import { Pago } from '../pagos/entities/pago.entity';
import axios from 'axios';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Cron } from '@nestjs/schedule';
import moment from 'moment';
import { SendEmailDto } from '../mailer/mailer.interface';
import { MailerService } from 'src/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
MailerService;
@Injectable()
export class MercadoPagoService {
  private mercadopagoClient: mercadopago.MercadoPagoConfig;
  @InjectRepository(Plan)
  private planRepository: Repository<Plan>;
  @InjectRepository(Pago)
  private pagosRepository: Repository<Pago>;
  @InjectRepository(User)
  private userRepository: Repository<User>;

  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.mercadopagoClient = new mercadopago.MercadoPagoConfig({
      accessToken:
        'APP_USR-6388226938088227-070410-84089c51e198a5281fed512e8c8f653e-1884641309',
    });
  }

  async createPreference(crearPagoDto: CrearPagoDto) {
    const preference = new mercadopago.Preference(this.mercadopagoClient);

    try {
      const plan = await this.planRepository.findOne({
        where: { id: crearPagoDto.id_plan },
      });

      const price = parseFloat(plan.price.toString());
      console.log(plan.price);

      if (!plan) {
        throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
      }

      const user = await this.userRepository.findOne({
        where: { email: crearPagoDto.userEmail },
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      const response = await preference.create({
        body: {
          items: [
            {
              id: uuidv4(),
              title: `Suscripcion al plan: ${plan.name}`,
              quantity: 1,
              unit_price: price,
            },
          ],
          back_urls: {
            failure: 'http://localhost:3000/finalstep',
            pending: 'http://localhost:3000/finalstep',
            success: 'http://localhost:3000/login',
          },
        },
      });

      //  Actualizar el plan del usuario
      user.plan = plan;
      await this.userRepository.save(user);

      //Guardar información del pago en la base de datos
      const pago = new Pago();
      pago.fecha_pago = new Date();
      pago.metodopago = 'MercadoPago';
      pago.id_plan = plan;
      pago.clientes = user;

      console.log(pago);

      await this.pagosRepository.save(pago);

      return response;
    } catch (error) {
      throw new Error(`Error creating preference: ${error.message}`);
    }
  }

  async getAll(page: number, limit: number): Promise<Pago[]> {
    let pagos = await this.pagosRepository.find();
    const start = (page - 1) * limit;
    const end = start + limit;
    pagos = pagos.slice(start, end);
    return pagos;
  }

  async getOne(id: string) {
    const pago = this.pagosRepository.findOne({ where: { id } });
    return pago;
  }

  async updateOne(id: string, dto: UpdatePagoDto) {
    const updatePago = await this.pagosRepository.findOneBy({ id });

    if (!updatePago) {
      if (!updatePago) {
        throw new HttpException('El pago no existe', HttpStatus.NOT_FOUND);
      }

      const update = await this.pagosRepository.save({ ...updatePago, ...dto });

      return updatePago;
    }
  }

  async createEfectivo(crearPagoDto: CrearPagoDto) {
    const plan = await this.planRepository.findOne({
      where: { id: crearPagoDto.id_plan },
    });

    const user = await this.userRepository.findOne({
      where: { email: crearPagoDto.userEmail },
    });

    const pago = new Pago();
    pago.fecha_pago = new Date();
    pago.metodopago = 'Efectivo';
    pago.id_plan = plan;
    pago.clientes = user;
    return await this.pagosRepository.save(pago);
  }
  // public calcularFechaPagoSiguiente(fechaPago: Date): Date {
  //   const fechaPagoMoment = moment(fechaPago);
  //   const siguienteMes = fechaPagoMoment.add(1, 'months').endOf('month');
  //   return siguienteMes.toDate();
  // }
  public calcularFechaPagoSiguiente(fechaPago: Date): Date {
    const fechaPagoMoment = moment(fechaPago);
    const siguienteFechaPago = fechaPagoMoment.add(1, 'months');
    return siguienteFechaPago.toDate();
  }

  @Cron('40 10 * * *')
  async getAllPagos() {
    const pagos = await this.pagosRepository.find();
    const hoy = moment();
    console.log('paso por aqui');

    for (const pago of pagos) {
      // if (!pago.clientes || !pago.clientes) {
      //   console.error(
      //     `Cliente no encontrado o no tiene email para el pago con ID: ${pago.id} icliente ${pago.clientes}`,
      //   );
      //   continue;
      // }
      const siguienteFechaPago = this.calcularFechaPagoSiguiente(
        pago.fecha_pago,
      );
      const diasRestantes = moment(siguienteFechaPago).diff(hoy, 'days');
      console.log(
        `Pago ID: ${pago.id}, Fecha de pago siguiente: ${siguienteFechaPago}, Días restantes: ${diasRestantes}`,
      );

      if (diasRestantes === 5) {
        console.log('entro acá');

        const emailDto: SendEmailDto = {
          from: {
            name: this.configService.get<string>('APP_NAME'),
            address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
          },
          recipients: [
            {
              name: pago.clientes.email, // Ajusta según tu entidad Pago
              address: pago.clientes.email, // Ajusta según tu entidad Pago
            },
          ],
          subject: 'Recordatorio de pago',
          html: `<p>Estimado ${pago.clientes.email},</p>
                 <p>Este es un recordatorio de que su pago está próximo a vencer el ${siguienteFechaPago.toLocaleDateString()}.</p>
                 <p>Gracias por su atención.</p>`,
          placeholderReplacements: {
            nombre: pago.clientes.email, // Ajusta según tu entidad Pago
            fechaPago: siguienteFechaPago.toLocaleDateString(),
          },
        };
        console.log(emailDto + 'enviar correo');

        try {
          await this.mailService.sendEmail(emailDto);
          console.log(`Correo enviado a ${pago.clientes}`);
          console.log(emailDto + 'enviar correo 1');
        } catch (error) {
          console.error(
            `Error al enviar el correo a ${pago.clientes.email}:`,
            error,
          );
        }
      }
    }
  }
}
