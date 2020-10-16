import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  userId: string;
  @ApiProperty({
    format: 'object',
  })
  @IsArray()
  location: number[];
}
