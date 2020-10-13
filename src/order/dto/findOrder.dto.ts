import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional} from 'class-validator';

export class FindOrderDto { 
    @IsOptional()
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    userId: string;
    @IsOptional()
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    staffId: string;    
}
