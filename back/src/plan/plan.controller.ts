import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/put-plan.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { ApiTags } from '@nestjs/swagger';


@Controller('plan')
@ApiTags('CrearPlan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('createplan')
  @Roles(Role.Admin)
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  @Roles(Role.User,Role.Admin)
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }
}
