import { Module } from "@nestjs/common";
import { User, UserSchema } from "src/schema/userProfile.schema";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { userService } from "./users.service";
import { AuthService } from "src/auth/auth.service";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule, JwtService } from "@nestjs/jwt";


@Module({
    imports:[ MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),AuthModule],
    controllers:[UsersController],
    providers:[userService]
})

export class usermodules{}