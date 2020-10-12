import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto { 
    @ApiProperty({
        format: 'string',
      })  
    readonly username: string;
    @ApiProperty({
        format: 'string',
      }) 
    readonly password: string;
}