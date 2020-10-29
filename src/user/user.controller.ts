import {
  Controller,
  Body,
  Logger,
  Query,
  UseGuards,
  Get,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { LocationRepository } from './location.repository';
import { ProfileRepository } from './profile.repository';
import { ILocation } from './interfaces/location.interface';
import { IUserProfile } from './interfaces/userProfile.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { ProfileDto } from './dto/profile.dto';
import { CreateLocationDto } from './dto/location.dto';
import { AuthorizationDto } from './dto/authorization.dto';
import { NearDto } from './dto/near.dto';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
import { SuccessDto } from '../shared/dto/success.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { Roles } from '../auth/role/roles.decorator';
import * as path from 'path';
import { CreateUserProfileDto } from './dto/createUserProfile.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly userDB: UserRepository,
    private readonly locationDB: LocationRepository,
    private readonly profileDB: ProfileRepository,
  ) {}

  @Post()
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async addUser(@Body() user: CreateUserDto): Promise<SuccessDto> {
    return this.userService.registerLocal(user);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads/profileimages',
        filename: (req, file, cb) => {
          const filename: string = Date.now().toString();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },        
      }),
      fileFilter:  (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else { 
          req.fileValidationError = 'goes wrong on the mimetype';
          cb(null,false);
        }
      }, 
    }),
  )
  uploadFile(
    @UploadedFile() file,
    @Body() profile: ProfileDto,
    //@Body('role') role:string,
    @Req() req   
  ): Promise<any>{   
    const token = req.headers["authorization"].replace('Bearer ', '');  
    if(req.fileValidationError){throw new HttpException('Only .png, .jpg and .jpeg format allowed!', HttpStatus.BAD_REQUEST);};
   
    return this.userService.addInfo(profile,token, file.filename);
  }

  @Get('image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(
      path.join(process.cwd(), 'src/uploads/profileimages/' + imagename),
    );
  }

  @Get('state')
  @UseGuards(JwtAuthGuard)    
  async getUserState( @Req() req  ): Promise<any> { 
    const token = req.headers["authorization"].replace('Bearer ', '');     
    return this.userService.getUserState(token);
  }

  //@Roles(['admin'])
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'OK', type: CreateLocationDto })
   
  async getProfile(@Query('userId') userId: string): Promise<any> {    
    return this.profileDB.findProfileByUserId(userId);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'OK', type: UpdateDto })
  async updateProfile(@Body() profile: IUserProfile): Promise<UpdateDto> {
    return this.profileDB.updateProfile(profile);
  }

  @Post('location')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'OK', type: CreateLocationDto })
  async addLocation(@Body() data: CreateLocationDto): Promise<any> {
    return this.locationDB.createLocation(data);
  }

  @Get('location')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'OK', type: CreateLocationDto })
  async getLocation(@Query('userId') userId: string): Promise<ILocation> {
    return this.locationDB.getLocation(userId);
  }

  @Put('location')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'OK', type: CreateLocationDto })
  async updateLocation(@Body() data: ILocation): Promise<UpdateDto> {
    return this.locationDB.updateLocation(data);
  }

  @Get('near')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async nearStaff(
    @Query('category') category: string,
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ): Promise<NearDto[]> {
    return this.locationDB.nearStaff(category, lat, lng);
  }

  // @Get('confirmUser')
  // @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  // async confirm(@Query('token') token: string): Promise<SuccessDto> {
  //   return this.userService.confirmUser(token);
  // }

  // @Get('updateToken')
  // @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  // async updateToken(@Query('email') email: string): Promise<SuccessDto> {
  //   return this.userService.updateMail(email);
  // }

  @Post('getUser')
  @UseGuards(JwtAuthGuard)
  async getUser(@Body() userid: string): Promise<any> {
    return await this.userDB.findUserById(userid);
  }

  // @Get('test')
  // async getCategory(@Query('id') id: string,){
  //   return await this.userDB.getCategory(id);
  // }
}
