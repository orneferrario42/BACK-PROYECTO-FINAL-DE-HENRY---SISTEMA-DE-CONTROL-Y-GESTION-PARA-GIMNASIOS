import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdatePlanDto {
  /**Esta es la propiedad puede modificar el name
   * @example plan premium 3 dias
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(46)
  name: string;

  /**
   * Esta propiedad puede modificar el price
   * @example 100
   */
  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  price: number;
}
