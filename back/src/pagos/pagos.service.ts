import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mercadopago from 'mercadopago';
import { CrearPagoDto } from './dto/create-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../plan/entities/plan.entity';
import { Pago } from './entities/pago.entity';
import axios from 'axios';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PagosService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    @InjectRepository(Pago)
    private pagosRepository: Repository<Pago>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    // mercadopago.configurations.setAccessToken(this.configService.get('MERCADOPAGO_ACCESS_TOKEN'));
  }

  // async crearPago(createPagoDto: CrearPagoDto): Promise<any> {
  //   const { fecha_pago, metodoPago, id_plan } = createPagoDto;

  //   const plan = await this.planRepository.findOneBy(id_plan);
  //   if (!plan) {
  //     throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
  //   }

  //   const datosPago = {
  //     transaction_amount: plan.price,
  //     token: metodoPago,
  //     description: `Pago del plan: ${plan.name}`,
  //     payment_method_id: metodoPago,
  //   };

  //   try {
  //     const response = await mercadopago.Payment.create(datosPago);

  //     const nuevoPago = new Pago();
  //     nuevoPago.fecha_pago = fecha_pago;
  //     nuevoPago.metodopago = metodoPago;
  //     nuevoPago.id_plan = plan;

  //     await this.pagosRepository.save(nuevoPago);

  //     return response;
  //   } catch (error) {
  //     throw new HttpException('No se pudo realizar el pago', HttpStatus.BAD_REQUEST);
  //   }
  // }

  async createSubscription(crearPagoDto: CrearPagoDto) {
    const url = 'https://api.mercadopago.com/preapproval';

    const plan = await this.planRepository.findOne({
      where: { id: crearPagoDto.id_plan },
    });

    if (!plan) {
      throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOne({
      where: { email: crearPagoDto.userEmail },
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const body = {
      reason: `Suscripcion al plan: ${plan.name}`,
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: plan.price,
        currency_id: 'ARS',
      },
      back_url: 'https://google.com.ar' /* website */,
      payer_email: /*"test_user_46945293@testuser.com"*/ user.email,
    };

    try {
      const subscription = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      });

      // Actualizar el plan del usuario
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

      return subscription.data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'No se pudo realizar el pago',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
