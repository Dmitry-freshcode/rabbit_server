import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  id: string;
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  role: string;
  @ApiProperty({
    format: 'number',
  })
  @IsNumber()
  iat: number;
  @ApiProperty({
    format: 'number',
  })
  @IsNumber()
  exp: number;
  @ApiProperty({
    format: 'boolean',
  })
  @IsBoolean()
  valid: boolean;
}
