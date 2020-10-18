import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';
import { CreateUserProfileDto } from './createUserProfile.dto';
import { CreateLocationDto } from './location.dto';

export class NearDto {
  @ApiProperty({
    format: 'string',
  })
  @IsString()
  userId: string;
  @ApiProperty({
    format: 'object',
  })
  loc: CreateLocationDto;
  profile: CreateUserProfileDto;
}
