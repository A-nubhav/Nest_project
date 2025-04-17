// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: any) {
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.sign(payload);
    console.log(token);
    return { access_token: token };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      return { error: 'Invalid token' };
    }
  }
}
