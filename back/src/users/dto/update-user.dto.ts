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

// export class UpdateUserDto extends PartialType(CreateUserDto) {
//   /**en esta propiedra el usuario puede cambiar su contraseña */
//   @IsOptional()
//   @MinLength(8)
//   @MaxLength(15)
//   @IsString()
//   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
//     message:
//       'Password invalida. Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial (!@#$%^&*)',
//   })
//   password: string;
//   /**en esta propiedra el usuario puede cambiar el plan donde esta inscripto */
//   @IsOptional()
//   @IsUUID()
//   plan: Plan;

//   /**en esta propiedra el usuario puede cambiar de profesor */
//   @IsOptional()
//   @IsUUID()
//   profesor: Profesor;

//   /**en esta propiedra el usuario puede cambiar de los dias de asistencia */
//   @IsString()
//   @IsOptional()
//   diasSeleccionados: string[];
//   /**en esta propiedra el usuario puede cambiar su objetivo*/
//   objetivo: string[];

//   @IsOptional()
//   @IsString()
//   nivelActividad?: string;

//   rutina: string;
// }
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


