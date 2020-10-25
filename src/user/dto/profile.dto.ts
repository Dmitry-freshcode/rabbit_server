import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ProfileDto {
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  middleName: string;
  @ApiProperty({
    format: 'Date',
  })
  @IsString()
  @IsNotEmpty()
  birthday: Date;
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  city: string;
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  state: string;
  // @ApiProperty({
  //   format: 'string',
  // })
  // @IsString()
  // @IsNotEmpty()
  // userId: string;
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}
