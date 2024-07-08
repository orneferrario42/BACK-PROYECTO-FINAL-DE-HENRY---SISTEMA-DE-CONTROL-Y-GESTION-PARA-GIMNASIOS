import { Injectable } from '@nestjs/common';

import { PlanRepository } from './plan.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/put-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}
  async create(createPlanDto: CreatePlanDto) {
    return this.planRepository.createPlan(createPlanDto);
  }

  findAll() {
    return this.planRepository.getAllPlans();
  }

  findOne(id: number) {
    return this.planRepository.getPlanById(id);
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return this.planRepository.updatePlan(id, updatePlanDto);
  }
}
