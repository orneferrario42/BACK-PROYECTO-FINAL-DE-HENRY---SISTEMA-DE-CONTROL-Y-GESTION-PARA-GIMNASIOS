import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Plan } from '../plan/entities/plan.entity';
import { planRepository } from 'src/plan/plan.repository';

@Module({
  imports: [ TypeOrmModule.forFeature([Plan, Pago])] ,
  controllers: [PagosController],
  providers: [PagosService, planRepository],
})
export class PagosModule {}
