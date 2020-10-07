import {
    Controller,
    Body,
    Logger,    
    UseGuards,
    Request,
    Get,
    Post,  
  } from '@nestjs/common';
  import { ApiTags, ApiResponse } from '@nestjs/swagger';
  import { UserService } from './user.service';
  import {CreateUserDto} from './dto/createUser.dto';
  import { CreateUserProfileDto } from './dto/createUserProfile.dto'
  import {SuccessDto} from './dto/success.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor( 

        private readonly userService: UserService,
      ) {}


    @Post('register')
    @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
      async addUser(
        @Body() user: CreateUserDto,
       @Body() profile: CreateUserProfileDto,        
        ): Promise<SuccessDto> {            
      this.logger.log(`register ${user.email}`); 
      //return {success: true}
      return this.userService.register(user,profile);  
  }

}





