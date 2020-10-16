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
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { LocationRepository } from './location.repository';
import { ProfileRepository } from './profile.repository';
import { ILocation } from './interfaces/location.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserProfileDto } from './dto/createUserProfile.dto';
import { CreateLocationDto } from './dto/location.dto';
import { SuccessDto } from '../shared/dto/success.dto';
import { diskStorage } from 'multer';

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
    return this.userService.register(user);
  }

  @Post('profile')
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async addProfile(@Body() profile: CreateUserProfileDto): Promise<SuccessDto> {
    return this.userService.addInfo(profile);
  }

  @Get('profile')
  @ApiResponse({ status: 200, description: 'OK', type: CreateLocationDto })
  async getProfile(@Query('userId') userId: string): Promise<any> {
    return this.profileDB.findProfileByUserId(userId);
  }

  @Put('profile')
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async updateProfile(
    @Body() profile: CreateUserProfileDto,
  ): Promise<SuccessDto> {
    return this.userService.addInfo(profile);
  }

  @Post('location')
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async addLocation(@Body() data: CreateLocationDto): Promise<ILocation> {
    return this.locationDB.createLocation(data);
  }

  @Get('location')
  @ApiResponse({ status: 200, description: 'OK', type: CreateLocationDto })
  async getLocation(@Query('userId') userId: string): Promise<ILocation> {
    return this.locationDB.getLocation(userId);
  }

  @Put('location')
  @ApiResponse({ status: 200, description: 'OK', type: CreateLocationDto })
  async updateLocation(@Body() data: ILocation): Promise<ILocation> {
    return this.locationDB.updateLocation(data);
  }

  @Get('near')
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async nearStaff(
    @Query('category') category: string,
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ): Promise<any> {
    return this.locationDB.nearStaff(category, lat, lng);
  }

  @Get('confirmUser')
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async confirm(@Query('token') token: string): Promise<SuccessDto> {
    return this.userService.confirmUser(token);
  }

  @Get('updateToken')
  @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
  async updateToken(@Query('email') email: string): Promise<SuccessDto> {
    return this.userService.updateMail(email);
  }

  @Post('getUser')
  async getUser(@Body() userid: string): Promise<any> {
    return await this.userDB.findUserById(userid);
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
