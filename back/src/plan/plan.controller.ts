import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/put-plan.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('plan')
@ApiTags('CrearPlan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('createplan')
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.Admin)
  async create(@Body() createPlanDto: CreatePlanDto) {
    const response = await this.planService.create(createPlanDto);
    return response;
  }

  @Get()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.User, Role.Admin)
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.planService.findOne(id);
  }

  @Put(':id')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return this.planService.update(id, updatePlanDto);
  }

  @Delete(':id')
  async removePlan(@Param('id', new ParseIntPipe()) id: number) {
    return this.planService.removePlan(id);
  }
}
