import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/put-plan.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('plan')
@ApiTags('PLAN')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  /**
   * Esta es el metodo que permite al admin crear planes
   */
  @Post('createplan')
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.Admin)
  async create(@Body() createPlanDto: CreatePlanDto) {
    const response = await this.planService.create(createPlanDto);
    return response;
  }

  /**
   * Este es el metodo que permite al admin ver todos los planes disponibles
   */
  @Get()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.planService.findAll(page, limit);
    }
    return this.planService.findAll(1, 5);
  }

  /**
   * Este es el metodo que permite al admin ver un plan
   */
  @Get(':id')
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.User, Role.Admin)
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.planService.findOne(id);
  }

  /**
   *Este metodo permite al admin modificar los planes
   */
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
