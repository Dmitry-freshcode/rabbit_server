import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServicesModule } from './services/services.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ChatModule } from './chat/chat.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    MongooseModule.forRoot(      
      process.env.MONGODB_CONNECTION_STRING,
      {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    AuthModule,
    ServicesModule,
    CategoryModule,
    OrderModule,
    ChatModule   
  ],
  controllers: [AppController],
  providers: [
    AuthModule,
    AppService],
})
export class AppModule {}
