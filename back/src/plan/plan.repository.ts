import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/put-plan.dto';
import { Pago } from 'src/pagos/entities/pago.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PlanRepository {
  constructor(
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
    @InjectRepository(User) private userRepository: Repository<User>,
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
  async getAllPlans(page: number, limit: number): Promise<Plan[]> {
    const planes = await this.planRepository.find();
    return planes;
  }

  async findByIdNotThrow(id: number) {
    return await this.planRepository.findOne({ where: { id } });
  }

  async deletePlan(id: number) {
    const planToDelete = await this.planRepository.findBy({ id });
    if (!planToDelete)
      throw new NotFoundException(`Plan with id ${id} not found`);

    const paysWithPlan = await this.pagoRepository.find({
      where: { id_plan: id as any },
      relations: ['id_plan'],
    });

    await Promise.all(
      paysWithPlan.map(async (pay) => {
        pay.id_plan = null;
        await this.pagoRepository.save(pay);
      }),
    );

    const usersWithPlan = await this.userRepository.find({
      where: { plan: id as any },
    });

    await Promise.all(
      usersWithPlan.map(async (user) => {
        user.plan = null;
        await this.userRepository.save(user);
      }),
    );

    await this.planRepository.delete({ id });
    return planToDelete;
  }
}
