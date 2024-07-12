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
  findAll() {
    return this.planService.findAll();
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
}
