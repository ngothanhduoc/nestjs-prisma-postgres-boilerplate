import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../../prisma/prisma.service';

const configService = new ConfigService();
const secretOrKey = configService.get('JWT_SECRET_KEY');

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  async validate(payload: { email: string }) {
    const { email } = payload;

    const user: any = await this.prismaService.user.findFirst({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
      },
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    user.roles = [user.role];

    return user;
  }
}
