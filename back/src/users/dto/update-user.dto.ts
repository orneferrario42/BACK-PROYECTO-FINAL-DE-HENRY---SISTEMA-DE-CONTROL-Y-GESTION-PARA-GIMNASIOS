import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Plan } from 'src/plan/entities/plan.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**en esta propiedra el usuario puede cambiar su contraseña */
  @IsOptional()
  @MinLength(8)
  @MaxLength(15)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message:
      'Password invalida. Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial (!@#$%^&*)',
  })
  password: string;
  /**en esta propiedra el usuario puede cambiar el plan donde esta inscripto */
  @IsOptional()
  plan: Plan;
  /**en esta propiedra el usuario puede cambiar de profesor */
  @IsOptional()
  profesor: Profesor;

  /**en esta propiedra el usuario puede cambiar de los dias de asistencia */
  @IsString()
  @IsOptional()
  diasSeleccionados: string[];
  /**en esta propiedra el usuario puede cambiar su objetivo*/
  objetivo: string[];

  rutina: string;
}
