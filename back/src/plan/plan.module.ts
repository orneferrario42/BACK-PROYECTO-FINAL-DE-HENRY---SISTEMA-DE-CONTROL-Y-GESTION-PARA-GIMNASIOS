import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { planRepository } from './plan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [PlanService, planRepository],
})
export class PlanModule {}
