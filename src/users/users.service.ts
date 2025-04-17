import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schema/userProfile.schema";
import * as bcrypt from 'bcrypt';
import { AuthService } from "src/auth/auth.service";
import { UserSigninDto } from "src/DTO/user.signin.dto";



@Injectable()
export class userService{
    private readonly saltRounds = 10;
   constructor(@InjectModel(User.name) private UserSchema:Model<User> ,
         private AuthService:AuthService ){}
   async userSignup(userData:Record<string,any>,ip:string){
        const alreadyExist=await this.UserSchema.findOne({email:userData.email});
        console.log(alreadyExist);
        // return `message `;
        if(alreadyExist){
            return "redirect to login route";
        } 
        const hashPassword=await bcrypt.hash(userData.password, this.saltRounds);
        const user= await this.UserSchema.create({
            email:userData.email,
            password:hashPassword,
            name:userData.name,
            isActive:false,
            postCount:0,
            ip:ip
        });
        console.log(user);
        return "Account created";
   }    

   async userSignin(userData:UserSigninDto){
         console.log(userData.email);
        const userDBdata=await this.UserSchema.findOne({email:userData.email});
        console.log(userDBdata);
        if(!userDBdata){
            return "redirect to signup route";
        }
        console.log(userDBdata);
        const isMatch=await bcrypt.compare(userData.password,userDBdata.password);
        if(!isMatch){
            return "invalid credentials";
        }
        if(userDBdata.isActive){
            return "already logged in"
        }
        const user=await this.UserSchema.updateOne({email:userDBdata.email},{
            isActive:true
        });
        const token= await this.AuthService.generateToken({_id:userDBdata._id,email:userDBdata.email});
        return {token};
   }

   async userSignout(token:string){
     if(!token){
        return "token required";
     }
    const decodedData= await this.AuthService.verifyToken(token);
    if(decodedData.error){
        return "INVALID TOKEN";
    }
    const DBdata = await this.UserSchema.findOne({_id:decodedData.sub});
    if(DBdata==null){
        return "redirect to signup";
    }
    if(DBdata!=null && !DBdata.isActive){
        return "already logged out"; 
    }
    const user=await this.UserSchema.updateOne({_id:decodedData.sub},{
        isActive:false
    });
    console.log(user);
    return "logged out successfully";
   }


   async getProfile(authToken:string){
    if(!authToken){
        return "token required";
     }
    const decodedData= await this.AuthService.verifyToken(authToken);
    if(decodedData.error){
        return "INVALID TOKEN";
    }
    const DBdata = await this.UserSchema.findOne({_id:decodedData.sub},{email:1,name:1,postCount:1});
    return `user data ${DBdata}`;
   }
}

