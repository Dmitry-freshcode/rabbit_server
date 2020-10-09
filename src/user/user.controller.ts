import {
    Controller,
    Body,
    Logger,
    Param,
    Query,    
    UseGuards,
    Request,    
    Get,
    Post,  
  } from '@nestjs/common';
  import { ApiTags, ApiResponse } from '@nestjs/swagger';
  import { UserService } from './user.service';
  import {CreateUserDto} from './dto/createUser.dto';
  import { CreateUserProfileDto } from './dto/createUserProfile.dto';
  import { ConfirmUserDto } from './dto/confirmUser.dto';
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
        @Body() user: CreateUserDto): Promise<SuccessDto> {            
      this.logger.log(`register ${user.email}`);     
      return this.userService.register(user);  
    }

    @Post('profile')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async addProfile(
        @Body() user: CreateUserDto,
        @Body() profile: CreateUserProfileDto,        
          ): Promise<SuccessDto> {            
        this.logger.log(`add info ${user.email}`); 
        return this.userService.addInfo(user,profile);  
    }

    @Get('confirmUser')
    @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
      async confirm(@Query('token') token: string): Promise<SuccessDto> {            
      this.logger.log(`confirm user with token  ${token}`); 
      return this.userService.confirmUser(token);  
    }

    @Get('updateToken')
    @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
      async updateToken(
      @Body() email: string,             
        ): Promise<SuccessDto> {            
      this.logger.log(`update mail to ${email}`); 
      return this.userService.updateMail(email);  
  }
     


}





