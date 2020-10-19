import { ApiProperty } from '@nestjs/swagger';
import { IsString , IsEmail } from 'class-validator';
export class LoginResponseDto {
  @ApiProperty({
     format: 'string'
   })
   @IsString()
   access_token: string;
   @ApiProperty({
    format: 'string'
   })
   @IsEmail()
   email: string;
   @ApiProperty({
   format: 'string'
   })
   @IsString()
   role: string;
}
