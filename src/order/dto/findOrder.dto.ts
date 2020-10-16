import { ApiProperty } from '@nestjs/swagger';
import { CreateUserProfileDto } from '../../user/dto/createUserProfile.dto';
import { CreateCategoryDto } from '../../category/dto/category.dto';
import { IsString , IsDateString , IsArray , IsObject , IsNotEmptyObject} from 'class-validator';

export class FindOrderDto {   
    @ApiProperty({
        format: 'string',
      })     
    @IsString()    
    _id: string;
    @ApiProperty({
      format: 'string',
    }) 
    @IsString()    
    status: string;
    @ApiProperty({
      format: 'string',
    }) 
    @IsString()    
    userId: CreateUserProfileDto;
    @ApiProperty({
      format: 'string',
    }) 
    @IsString()    
    staffId: CreateUserProfileDto;
    @ApiProperty({
      format: 'date',
    }) 
    @IsDateString()    
    timeStart: Date;    
    @ApiProperty({
      format: 'date',
    }) 
    @IsDateString()    
    timeEnd: Date;
    @ApiProperty({
      format: 'array',
    }) 
    @IsArray() 
    category: CreateCategoryDto; 
    @ApiProperty({
        format: 'object',
      }) 
    @IsObject()
    @IsNotEmptyObject()
    userLocation: {
        lat: string,
        lng: string 
    } 
}
