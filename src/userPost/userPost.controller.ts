import { Body, Controller, Post, Req ,Get} from "@nestjs/common";
import { postService } from "./userPost.service";
import { createPostDTO } from "src/DTO/post.create.dto";
import mongoose from "mongoose";
import { request } from "http";



@Controller('users')
export class PostController{
   
   constructor(private postService:postService){}

   @Post("createPost")
   createPost(@Body() postData:createPostDTO,@Req() request:Request){
    const { authorization }: any = request.headers;
    const authToken = authorization.replace(/bearer/gim, '').trim();
     return this.postService.createPost(postData,authToken);
   }
  
   @Post('deletePost')
   deletePost(@Body() postID:mongoose.Schema.Types.ObjectId,@Req() request:Request){
    const { authorization }: any = request.headers;
    const authToken = authorization.replace(/bearer/gim, '').trim();
    return this.postService.deletePost(authToken,postID);
   }

   @Get("getAllPost")
   getPost(@Req() request:Request){
    const { authorization }: any = request.headers;
    const authToken = authorization.replace(/bearer/gim, '').trim();
    return this.postService.getAllPost(authToken);
   }

}