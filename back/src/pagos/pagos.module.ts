import { Module } from '@nestjs/common';
import { MercadoPagoService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Plan } from '../plan/entities/plan.entity';
import { PlanRepository } from 'src/plan/plan.repository';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';

@Module({
  // imports: [ TypeOrmModule.forFeature([Plan, Pago, User])] ,
  // controllers: [PagosController],
  // providers: [PagosService, PlanRepository, UsersRepository],
  imports: [TypeOrmModule.forFeature([Plan, Pago, User])],
  providers: [MercadoPagoService, PlanRepository, UsersRepository],
  controllers: [PagosController],
})
export class PagosModule {}
