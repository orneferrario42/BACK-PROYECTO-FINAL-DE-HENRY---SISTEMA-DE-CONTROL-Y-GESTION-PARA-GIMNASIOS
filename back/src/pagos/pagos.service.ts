import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { CrearPagoDto } from './dto/create-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../plan/entities/plan.entity';
import { Pago } from '../pagos/entities/pago.entity';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { NotificationService } from 'src/notificaciones/notification.service';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Cron } from '@nestjs/schedule';
import moment from 'moment';
import { transporter } from 'src/config/configMailer';

@Injectable()
export class MercadoPagoService {
  private mercadopagoClient: mercadopago.MercadoPagoConfig;
  @InjectRepository(Plan)
  private planRepository: Repository<Plan>;
  @InjectRepository(Pago)
  private pagosRepository: Repository<Pago>;
  @InjectRepository(User)
  private userRepository: Repository<User>;
  @InjectRepository(Profesor)
  private profesorRepository: Repository<Profesor>;

  constructor(private notificationService: NotificationService) {
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

      if (!plan) {
        throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
      }

      const profesor = await this.profesorRepository.findOne({
        where: { id: crearPagoDto.id_profesor },
      });

      const user = await this.userRepository.findOne({
        where: { email: crearPagoDto.userEmail },
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Actualizar el plan y profesor del usuario
      user.plan = plan;
      user.profesor = profesor;
      user.metodoPago = 'MercadoPago';
      user.estado = true;
      user.diasSeleccionados = crearPagoDto.diasSeleccionados;
      user.horario = crearPagoDto.horarios;

      await this.userRepository.save(user);

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

      //Guardar información del pago en la base de datos
      const pago = new Pago();
      pago.fecha_pago = new Date();
      pago.metodopago = 'MercadoPago';
      pago.id_plan = plan;
      pago.clientes = user;

      await this.pagosRepository.save(pago);

      // Enviar notificación al administrador
      await this.notificationService.sendNotificationAdmin(
        `Hey! ${user.email} acaba de realizar un pago de ${price} por el ${plan.name}.`,
      );

      return response;
    } catch (error) {
      throw new Error(`Error de preferencia  ${error.message}`);
    }
  }

  async getAll(page: number, limit: number): Promise<Pago[]> {
    const pagos = await this.pagosRepository.find({
      relations: ['clientes', 'id_plan'],
      take: limit,
      skip: (page - 1) * limit,
    });

    return pagos;
  }

  async getOne(id: string) {
    const pago = this.pagosRepository.findOne({ where: { id } });
    return pago;
  }

  async updateOne(userId: string, dto: UpdatePagoDto) {
    // Buscar el usuario
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Buscar el pago asociado al usuario
    let pago = await this.pagosRepository.findOne({
      where: { clientes: { id: userId } },
      relations: ['clientes', 'id_plan'],
    });

    if (!pago) {
      // Si no existe un pago, crear uno nuevo
      pago = new Pago();
      pago.clientes = user;
      pago.fecha_pago = new Date(); // Fecha actual
      // Asigna otros campos necesarios para un nuevo pago
    }

    // Actualizar los campos del pago
    if (dto.metodo_pago) {
      pago.metodopago = dto.metodo_pago;
      // Actualizar también el metodoPago del usuario
      user.metodoPago = dto.metodo_pago;
    }
    // Actualiza otros campos según sea necesario

    // Guardar los cambios del pago
    await this.pagosRepository.save(pago);

    // Guardar los cambios del usuario
    return await this.userRepository.save(user);
  }

  async createEfectivo(crearPagoDto: CrearPagoDto) {
    const plan = await this.planRepository.findOne({
      where: { id: crearPagoDto.id_plan },
    });

    const user = await this.userRepository.findOne({
      where: { email: crearPagoDto.userEmail },
      relations: ['pagos'],
    });
    user.metodoPago = 'Efectivo';
    user.estado = true;
    await this.userRepository.save(user);

    const pago = new Pago();
    pago.fecha_pago = new Date();
    pago.metodopago = 'Efectivo';
    pago.id_plan = plan;
    pago.clientes = user;
    console.log(pago);

    const pagoGuardado = await this.pagosRepository.save(pago);
    return pagoGuardado;
  }
  public calcularFechaPagoSiguiente(fechaPago) {
    const hoy = new Date();
    const fechaPagoActual = moment(fechaPago);
    const siguienteFechaPago = fechaPagoActual.add(1, 'months');
    const diasRestantes = moment(siguienteFechaPago).diff(hoy, 'days');
    const datoFecha = {
      fechaPagoActual: fechaPagoActual,
      siguienteFechaPago: siguienteFechaPago,
      diasRestantes: diasRestantes
    }
    return datoFecha
  }

  @Cron('00 00 * * *')
  async getAllPagos() {

    const pagos = await this.pagosRepository.find({
      relations: ['clientes'],
    });

    pagos.map(async (p) => {

      const dr = this.calcularFechaPagoSiguiente(p.fecha_pago);

      if (Number(dr.diasRestantes) === 5) {
        // const htmlContent = getHtmlTemplate(p.clientes.name, dr.siguienteFechaPago.toString());
        const fechaFormateada = moment(dr.siguienteFechaPago).format('DD/MM/YYYY');

        try {
          await transporter.sendMail({
            from: '"PowerTraining" <PowerTraining@gmail.com>',
            to: p.clientes.email,
            subject: "Renovacion de Suscripción  ",

            html: `<!-- emailTemplate.html -->
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f6f6;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      .header img {
        width: 150px;
      }
      .content h2 {
        color: #333333;
      }
      .content p {
        color: #555555;
      }
      .button {
        text-align: center;
        margin-top: 20px;
      }
      .button a {
        background-color: #007bff;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        color: #999999;
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://github.com/Ezequiel-Sale/PF-HENRY-FRONT/blob/main/public/full-logo.png?raw=true" alt="PowerTraining">
      </div>
      <div class="content">
        <h2>Renovación de Suscripción</h2>
        <p>Hola ${p.clientes.name},</p>
        <p>Tu suscripción se vence el ${fechaFormateada}. te invitamos en los proximos 5 días a renovar tu suscripción.</p>
      </div>
      <div class="button">
        <a href="#">Renovar ahora</a>
      </div>
      <div class="footer">
        <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      </div>
    </div>
  </body>
  </html>`
          });
          
        } catch (error) {
          console.log('error al enviar correo' + error)
        }
      }
    })

  }

  async getMetadata(limit: number) {
    const totalPays = await this.pagosRepository.count();

    const totalPages = Math.ceil(totalPays / limit);

    const metadata = {
      totalPays,
      totalPages,
    };

    return metadata;
  }
}
