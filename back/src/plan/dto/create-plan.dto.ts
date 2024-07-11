import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  min,
} from 'class-validator';

export class CreatePlanDto {
  /**Esta es el id o numero de dias del plan
   * @example 1
   */
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  id: number;

  /**Esta es la propiedad name
   * @example plan premium 3 dias
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(46)
  name: string;

  /**
   * Esta propiedad price
   * @example 100
   */
  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  price: number;
}
