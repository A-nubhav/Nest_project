 import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema, userPost } from "src/schema/posts.schema";
import { PostController } from "./userPost.controller";
import { postService } from "./userPost.service";
import { AuthModule } from "src/auth/auth.module";
import { User, UserSchema } from "src/schema/userProfile.schema";

@Module({
    imports:[MongooseModule.forFeature([{name: userPost.name,schema: PostSchema},{name:User.name,schema:UserSchema}]),AuthModule],
    controllers:[PostController],
    providers:[postService]
})

export class postModule {}