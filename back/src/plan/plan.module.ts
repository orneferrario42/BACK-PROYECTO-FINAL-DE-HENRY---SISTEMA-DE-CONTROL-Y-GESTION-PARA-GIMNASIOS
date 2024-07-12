import { Module, forwardRef } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { PlanRepository } from './plan.repository';
import { ProfesorModule } from 'src/profesor/profesor.module';
import { Pago } from 'src/pagos/entities/pago.entity';
import { PagosModule } from 'src/pagos/pagos.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan, Pago, User]),
    forwardRef(() => ProfesorModule), // Uso de forwardRef para evitar dependencias circulares
    Pago,
    PagosModule,
  ],
  controllers: [PlanController],
  providers: [PlanService, PlanRepository],
  exports: [PlanRepository],
})
export class PlanModule {}
