import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ClientUserDto } from './dto/client-user.dto';

@Injectable()
export class UserService {
  constructor(private authService: AuthService, private prismaService: PrismaService) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const userInfo = await this.prismaService.user.findFirst({
      where: {
        email,
        isActive: true,
      },
    });
    if (!userInfo) {
      throw new NotAcceptableException('User not found');
    }
    const checkPassword = await bcrypt.compare(password, userInfo.hashedPassword);
    if (checkPassword) {
      return await this.authService.login(userInfo as unknown as ClientUserDto);
    }
    throw new NotAcceptableException('User not found');
  }
}
