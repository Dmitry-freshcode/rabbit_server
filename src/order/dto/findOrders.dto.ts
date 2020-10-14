import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional , IsDateString ,IsArray } from 'class-validator';

export class FindOrdersDto {   
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
    userId: string;
    @ApiProperty({
      format: 'string',
    }) 
    @IsString()    
    staffId: string;
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
    services: serviceDto[];
    @IsOptional()
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    staffFname: string;
    @IsOptional()
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    staffLname: string; 
    @IsOptional()
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    staffAvatar: string;
    @IsOptional()
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    userFname: string;
    @IsOptional()
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    userLname: string; 
    @IsOptional()
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    userAvatar: string;   
}

export class serviceDto { 
  @ApiProperty({
    format: 'string',
  }) 
  @IsString() 
  _id:string;
  @ApiProperty({
    format: 'string',
  }) 
  @IsString() 
  name:string;
  }
