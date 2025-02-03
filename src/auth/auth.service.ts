import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ClientUserDto } from './dto/client-user.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async login(user: ClientUserDto) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: '1d',
    });

    return { accessToken };
  }
}
