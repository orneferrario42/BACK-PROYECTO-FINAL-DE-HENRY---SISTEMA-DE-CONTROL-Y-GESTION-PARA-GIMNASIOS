import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Plan } from 'src/plan/entities/plan.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enum/roles.enum';

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;

  @IsString()
  phone?: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message:
      'Password invalida. Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial (!@#$%^&*)',
  })
  password?: string;

  @IsString()
  fecha_nacimiento?: string;

  @IsString()
  numero_dni?: string;

  @IsString()
  altura?: string;
  
  @IsArray() 
  peso?: string[];
  
  
  role?: Role;

  @IsBoolean()
  estado?: boolean;

  plan?: Plan;

  id_profesor?: string;

  @IsString()
  metodoPago?: string;
}


