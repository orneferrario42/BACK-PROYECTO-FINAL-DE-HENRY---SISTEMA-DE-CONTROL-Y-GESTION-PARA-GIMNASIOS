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
  async create(@Body() createPlanDto: CreatePlanDto) {
    const response = await this.planService.create(createPlanDto);
    return response;
  }

  /**
   * Este es el metodo que permite al admin ver todos los planes disponibles
   */
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.planService.findAll(page, limit);
    }
    return this.planService.findAll(page, limit);
  }

  /**
   * Este es el metodo que permite al admin ver un plan
   */
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.planService.findOne(id);
  }

  /**
   *Este metodo permite al admin modificar los planes
   */
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return this.planService.update(id, updatePlanDto);
  }
  /***
   * Este metodo permite borrar los planes creados
   */
  @Delete(':id')
  async removePlan(@Param('id', new ParseIntPipe()) id: number) {
    return this.planService.removePlan(id);
  }
}
