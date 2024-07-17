import { BadRequestException, Injectable } from '@nestjs/common';

import { PlanRepository } from './plan.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/put-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}
  async create(createPlanDto: CreatePlanDto) {
    const planFound = await this.planRepository.findByIdNotThrow(
      createPlanDto.id,
    );
    return planFound
      ? new BadRequestException('Plan ya existe con ese mismo numero de dias')
      : this.planRepository.createPlan(createPlanDto);
  }

  findAll(page: number, limit: number) {
    return this.planRepository.getAllPlans(page, limit);
  }

  findOne(id: number) {
    return this.planRepository.getPlanById(id);
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return this.planRepository.updatePlan(id, updatePlanDto);
  }

  removePlan(id: number) {
    return this.planRepository.deletePlan(id);
  }
}
