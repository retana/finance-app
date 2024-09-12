import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from '../shared/encrypt.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private jwtService: JwtService,
    private readonly encryptService: EncryptService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const isPasswordValid = await this.encryptService.comparePasswords(pass,user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}