import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({
    description: 'add an file',
    type: 'string',
    format: 'binary',
  })
  @IsString()
  @MaxLength(255)
  rutina?: string;
}
