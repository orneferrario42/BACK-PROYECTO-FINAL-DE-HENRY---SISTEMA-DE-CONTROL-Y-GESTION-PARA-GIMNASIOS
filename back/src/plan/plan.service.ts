import { Injectable } from '@nestjs/common';

import { planRepository } from './plan.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/put-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: planRepository) {}
  async create(createPlanDto: CreatePlanDto) {
    return this.planRepository.createPlan(createPlanDto);
  }

  findAll() {
    return this.planRepository.getAllPlans();
  }

  findOne(id: string) {
    return this.planRepository.getPlanById(id);
  }

  update(id: string, updatePlanDto: UpdatePlanDto) {
    return this.planRepository.updatePlan(id, updatePlanDto);
  }
}
