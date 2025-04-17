import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './userProfile.schema';

@Schema()
export class userPost extends Document{

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:User.name})
  userID:mongoose.Schema.Types.ObjectId;  //users reference id

  @Prop({required:true})
  email:string; 
  
  @Prop({ required: true})
  post: string;
  
  @Prop()
  commentCount:number;

  @Prop()
  likes:number;
}

@Schema()
export class Postcomment extends Document{
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:userPost.name})
    postID:mongoose.Schema.Types.ObjectId;

    @Prop()
    comments:string;
}

export const PostComment=SchemaFactory.createForClass(Postcomment);
export const PostSchema = SchemaFactory.createForClass(userPost);
