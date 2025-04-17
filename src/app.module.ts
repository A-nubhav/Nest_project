import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { usermodules } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { postModule } from './userPost/userPost.module';
import { config } from 'process';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
      load:[configuration]
    }),
    MongooseModule.forRootAsync({
      useFactory: async (ConfigService:ConfigService)=>({
           uri:ConfigService.get<string>('db.uri')
      }),
      inject:[ConfigService]
    }),
    usermodules,postModule],
  controllers:[]

})
export class AppModule {}
