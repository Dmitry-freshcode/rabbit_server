import {CreateUserProfileDto} from '../../user/dto/createUserProfile.dto'
import {CreateUserDto} from '../../user/dto/createUser.dto'
import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsString, IsDateString, IsBoolean, IsInt } from 'class-validator';

export class UserChatsDto { 
    @ApiProperty({
        format: 'string',
      }) 
    @IsString()    
    _id: string;
    @ApiProperty({
        format: 'Date',
      }) 
    @IsDateString()    
    created_at: Date;
    @ApiProperty({
        format: 'Date',
      }) 
    @IsDateString()    
    updated_at: Date;
    @ApiProperty({
        format: 'array',
      }) 
    @IsArray()    
    users: CreateUserDto[];
    @ApiProperty({
      format: 'array',
    }) 
    @IsArray()    
    usersProfiles: CreateUserProfileDto[]; 
    @ApiProperty({
      format: 'array',
    }) 
    @IsArray()    
    usersImg: UserImgDto[]; 
    @ApiProperty({
      format: 'number',
    }) 
    @IsInt()    
    messages: number;   
}

class UserImgDto { 
    @ApiProperty({
      format: 'string',
      }) 
    @IsString()    
    _id: string;
    @ApiProperty({
      format: 'string',
    }) 
    @IsString()    
    userId: string;
    @ApiProperty({
      format: 'string',
    }) 
    @IsString()    
    src: string;        
}
