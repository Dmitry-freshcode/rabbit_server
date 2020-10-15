import {
    Controller,
    Body,
    Logger,   
    Query,    
    UseGuards,       
    Get,
    Post,
    Patch,
    UseInterceptors, 
    UploadedFiles,
     
  } from '@nestjs/common';
  import { FileInterceptor,} from '@nestjs/platform-express';
  import { ApiTags, ApiResponse } from '@nestjs/swagger';
  import { UserService } from './user.service';
  import { UserRepository } from './user.repository'
  import {CreateUserDto} from './dto/createUser.dto';
  import { CreateUserProfileDto } from './dto/createUserProfile.dto';
  import {SuccessDto} from '../shared/dto/success.dto';
  import { diskStorage } from 'multer';

@ApiTags('user')
@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(
        private readonly userService: UserService,
        private readonly userDB: UserRepository,
      ) {}

    @Post()
    @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
      async addUser(
        @Body() user: CreateUserDto): Promise<SuccessDto> {         
        return this.userService.register(user);  
    }

    @Post('profile')
    @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async addProfile(        
        @Body() profile: CreateUserProfileDto,        
          ): Promise<SuccessDto> {        
          return this.userService.addInfo(profile);  
    }

    @Patch('profile')
    @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async updateProfile(        
        @Body() profile: CreateUserProfileDto,        
          ): Promise<SuccessDto> {        
          return this.userService.addInfo(profile);  
    }

    @Post('location')
    @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async addLocation(        
        @Body() profile: CreateUserProfileDto,        
          ): Promise<SuccessDto> {        
          return this.userService.addInfo(profile);  
    }

    @Get('confirmUser')
    @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
      async confirm(@Query('token') token: string): Promise<SuccessDto> {       
       return this.userService.confirmUser(token);  
    }

    @Get('updateToken')
    @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
      async updateToken(@Query('email') email: string): Promise<SuccessDto>{      
        return this.userService.updateMail(email);  
   }

















   @Post('getUser')
   async getUser( @Body() userid: string): Promise<any>{
     return await this.userDB.findUserById(userid)
   }





  //  @Post('upload')
  //  @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './upload',        
  //     }),      
  //   }),
  // )
  //  uploadFile(@UploadedFiles() files) {
  //   console.log(files);
  // }
     


}





