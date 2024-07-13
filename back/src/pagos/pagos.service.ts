import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

@Injectable()
export class MercadoPagoService {
  
  private mercadopagoClient: mercadopago.MercadoPagoConfig;
  @InjectRepository(Plan)
  private planRepository: Repository<Plan>;
  @InjectRepository(Pago)
  private pagosRepository: Repository<Pago>;
  @InjectRepository(User)
  private userRepository: Repository<User>;
  
  constructor() {
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
    
    if (!updatePago){

    if (!updatePago) {
      throw new HttpException('El pago no existe', HttpStatus.NOT_FOUND);
    }
    
    const update = await this.pagosRepository.save({ ...updatePago, ...dto });
    
    return updatePago;
  }}
    
  async createEfectivo(crearPagoDto: CrearPagoDto) {
    const plan = await this.planRepository.findOne({
      where: { id: crearPagoDto.id_plan },
    })

    const user = await this.userRepository.findOne({
      where: { email: crearPagoDto.userEmail },
    })
  
    const pago = new Pago();
    pago.fecha_pago = new Date();
    pago.metodopago = 'Efectivo';
    pago.id_plan = plan;
    pago.clientes = user;
    return await this.pagosRepository.save(pago);
  }
}

