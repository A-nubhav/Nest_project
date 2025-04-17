import { IsString, MaxLength, MinLength } from "class-validator";


export class createPostDTO{

    @MinLength(1)
    @MaxLength(200)
    post:string;

} 