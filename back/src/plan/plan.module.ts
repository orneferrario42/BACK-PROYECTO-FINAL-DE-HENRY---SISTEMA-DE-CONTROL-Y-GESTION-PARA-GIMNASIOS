import { Module, forwardRef } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { PlanRepository } from './plan.repository';
import { ProfesorModule } from 'src/profesor/profesor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan]),
    forwardRef(() => ProfesorModule) // Uso de forwardRef para evitar dependencias circulares
  ],
  controllers: [PlanController],
  providers: [PlanService, PlanRepository],
  exports: [PlanRepository],
})
export class PlanModule {}