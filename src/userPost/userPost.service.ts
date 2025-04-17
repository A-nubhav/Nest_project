import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { createPostDTO } from "src/DTO/post.create.dto";
import { userPost } from "src/schema/posts.schema";
import { User } from "src/schema/userProfile.schema";


@Injectable()
export class postService{

    
    constructor(@InjectModel(userPost.name) private PostSchema: Model<userPost>,
        @InjectModel(User.name) private UserSchema: Model<User>,
        private Authservice: AuthService) { }
    async createPost(postData: createPostDTO, authToken: string) {
        if (!authToken) {
            return "Token required";
        }
        const decodedData = await this.Authservice.verifyToken(authToken);
        if (decodedData.error) {
            return "Access denied";
        }
        const DBdata = await this.UserSchema.findOne({ _id: decodedData.sub });
        if (!DBdata) {
            return "signup first";
        }
        const postCreated = await this.PostSchema.create({
            userID: DBdata._id,
            email: DBdata.email,
            post: postData.post,
            commentCount: 0,
            likes: 0
        });
        console.log(postCreated);
        const updatedProfile=await this.UserSchema.findByIdAndUpdate(DBdata._id,{$inc:{postCount:1}},{new:true});
        console.log(updatedProfile);
        return `post created postID:${postCreated._id}`;
    }

    async deletePost(authToken:string,postID:mongoose.Schema.Types.ObjectId){
        if (!authToken) {
            return "Token required";
        }
        const decodedData = await this.Authservice.verifyToken(authToken);
        if (decodedData.error) {
            return "Access denied";
        }
        // const DBdata = await this.UserSchema.findOne({ _id: decodedData.sub });
        // if (!DBdata) {
        //     return "signup first";
        // }
        try{
          const deletedPost=await this.PostSchema.findByIdAndDelete(postID);
          const updatedProfile=await this.UserSchema.findByIdAndUpdate(decodedData.sub,{$inc:{postCount:-1}},{new:true});
          return "post deleted";
        }
        catch(error){
            console.log(error);
        }
    }

    async getAllPost(authToken:string){
        if (!authToken) {
            return "Token required";
        }
        const decodedData = await this.Authservice.verifyToken(authToken);
        if (decodedData.error) {
            return "Access denied";
        }
        const allPost=await this.PostSchema.find({userID:decodedData.sub},{post:1,commentCount:1,likes:1});
        return `all post user:${allPost}`;
    }
}


