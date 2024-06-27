import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Plan } from 'src/pagos/entities/plan.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  plan: Plan;
  profesor: Profesor;
  diasSeleccionados: string[];
  objetivo: string[];
  rutina: string;
}
