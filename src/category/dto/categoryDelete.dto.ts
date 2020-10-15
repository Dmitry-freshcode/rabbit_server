import { ApiProperty } from '@nestjs/swagger';
import { IsNumber , IsOptional} from 'class-validator';

export class DeleteCategoryDto { 
    @ApiProperty({
        format: 'number',
      }) 
    @IsOptional()
    @IsNumber()    
    n?: number;
    @ApiProperty({
        format: 'number',
      })
    @IsOptional()
    @IsNumber()    
    ok?: number;
    @ApiProperty({
        format: 'number',
      })
    @IsOptional() 
    @IsNumber()    
    deletedCount?: number;     
}
