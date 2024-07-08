import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/put-plan.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('plan')
@ApiTags('CrearPlan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('createplan')
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.Admin)
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  // @UseGuards(AuthGuard,RolesGuard)
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
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.Admin)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return this.planService.update(id, updatePlanDto);
  }
}
