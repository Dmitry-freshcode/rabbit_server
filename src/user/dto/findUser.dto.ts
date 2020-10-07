import { ApiProperty } from '@nestjs/swagger';
export class FindUserDto {  
    @ApiProperty({
        format: 'string',
      })  
    readonly email: string;    
}