import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
  min,
} from 'class-validator';

export class CreatePlanDto {
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
