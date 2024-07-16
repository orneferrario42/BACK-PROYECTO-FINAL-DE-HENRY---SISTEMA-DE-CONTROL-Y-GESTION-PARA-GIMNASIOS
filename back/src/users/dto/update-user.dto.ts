import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Plan } from 'src/plan/entities/plan.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import {
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enum/roles.enum';

export class UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  fecha_nacimiento?: string;
  numero_dni?: string;
  altura?: string;
  peso?: string;
  role?: Role;
  estado?: boolean;
  plan?: Plan;
  profesor?: Profesor;
  metodoPago?: string;
}


