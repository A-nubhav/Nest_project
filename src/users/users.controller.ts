import { Controller, Get, Post,Req ,HttpCode,Res,Header,Redirect, Param, Query, Body, Ip} from "@nestjs/common";
import { Request,Response} from "express";
import { userService } from "./users.service";
import { UserSignupDto } from "src/DTO/user.signup.dto";
import { UserSigninDto } from "src/DTO/user.signin.dto";



@Controller('/users')
export class UsersController{
     
     constructor(private userService:userService){}

     @Get("/profile")
     getProfile(@Req() request:Request){
      const { authorization }: any = request.headers;
      const authToken = authorization.replace(/bearer/gim, '').trim();
      return this.userService.getProfile(authToken);
     }

     @Post("/signup")
     userSignup(@Body() userData:UserSignupDto,@Ip() ip:string){
        return this.userService.userSignup(userData,ip);

     }
     @Post("/signin")
     userSignin(@Body() userData:UserSigninDto){
        return this.userService.userSignin(userData);
     }
     
     @Post("/signout")
     userSignout(@Req() request: Request){
        const { authorization }: any = request.headers;
        const authToken = authorization.replace(/bearer/gim, '').trim();
        return this.userService.userSignout(authToken);
     }

}