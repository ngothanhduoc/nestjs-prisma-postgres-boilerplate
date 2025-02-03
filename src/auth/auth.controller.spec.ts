import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessControlModule } from 'nest-access-control';
import { roles } from 'src/app.roles';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccessControlModule.forRoles(roles)],
      controllers: [AuthController],
      providers: [AuthService, UserService, PrismaService, JwtService, ConfigService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
