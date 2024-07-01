import { PickType } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfesorDto {
  /**Esta es la propiedad nombre
   * @example mario
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  nombre: string;

  /** esta es el propiedra de edad
   * @example 30
   */
  @IsString()
  edad: string;

  /**esta es la propiedad de dias disponibles del profesor */
  @IsString()
  @IsArray()
  @ArrayMinSize(5)
  dia: string[];

  /**esta es la propiedad de horas disponibles del profesor */
  @IsString()
  @IsArray()
  @ArrayMinSize(8)
  horario: string[];

  /**Esta es la proiedra email
   * @example pedro@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**Esta es la propiedad password.
   * Debe ternar minimo 8 caracteres con mas de 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
   * @example Hola12345@
   */
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message:
      'Password invalida. Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial (!@#$%^&*)',
  })
  password: string;
  // estado?: boolean;
}
