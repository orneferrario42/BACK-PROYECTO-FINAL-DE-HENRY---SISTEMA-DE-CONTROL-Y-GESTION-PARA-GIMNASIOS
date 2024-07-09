import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/put-plan.dto';

@Injectable()
export class PlanRepository {
  constructor(
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
  ) {}
  async createPlan(createPlanDto: CreatePlanDto) {
    const plan = this.planRepository.create(createPlanDto);
    return await this.planRepository.save(plan);
  }
  async getPlanById(id: number) {
    const plan = await this.planRepository.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`Plan with id ${id} not found`);
    return plan;
  }
  async updatePlan(id: number, updatePlanDto: UpdatePlanDto) {
    await this.planRepository.update(id, updatePlanDto);
    const updatePlan = await this.planRepository.findOneBy({ id });
    if (!updatePlan)
      throw new NotFoundException(`Plan with id ${id} not found `);
    return updatePlan;
  }
  async getAllPlans() {
    return await this.planRepository.find();
  }
}
