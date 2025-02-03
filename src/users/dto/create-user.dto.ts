import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  hashedPassword: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  isActive: boolean;
}
