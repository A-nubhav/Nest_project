// create-user.dto.ts
import { IsBoolean, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserSigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
