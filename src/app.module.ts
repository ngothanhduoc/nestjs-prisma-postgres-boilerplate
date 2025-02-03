import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { roles } from './app.roles';
import { AccessControlModule } from 'nest-access-control';
import { JwtAuthStrategy } from './auth/strategies/jwt-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
const configService = new ConfigService();
const secretOrKey = configService.get('JWT_SECRET_KEY');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AccessControlModule.forRoles(roles),
    ScheduleModule.forRoot(),
    AuthModule,
    JwtModule.register({
      secret: secretOrKey,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthStrategy],
})
export class AppModule {}
