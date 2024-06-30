import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  /**Esta es la propiedad name
   * @example jose
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  /**Esta es la proiedra email
   * @example pedro@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /** esta es el propiedra de fecha de nacimiento
   * @example 12/05/1999
   */
  @IsString()
  fecha_nacimiento: string;

  /**ests es la propiedra de numero telefonico
   * @example +57 3120000000
   */
  @IsNotEmpty()
  @IsNumber()
  phone: string;

  /**esta es la propiedra de numero de identificacion  */
  @IsNotEmpty()
  @IsNumber()
  numero_dni: string;

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

  /**esta propiedad es de confirmacion de password */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;
}
