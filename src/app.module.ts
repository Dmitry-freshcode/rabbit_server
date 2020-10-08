import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    MongooseModule.forRoot(
      //'mongodb://localhost/nest',
      process.env.MONGODB_CONNECTION_STRING,
      {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    //AuthModule   
  ],
  controllers: [AppController],
  providers: [
    //AuthModule,
    AppService],
})
export class AppModule {}
