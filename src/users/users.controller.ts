import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { AppRoles } from '../app.roles';

@Controller('users')
@ApiTags('Users')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard, ACGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseRoles({
  //   resource: 'users',
  //   action: 'create',
  //   possession: 'any',
  // })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.usersService.findAll(pageOptionsDto);
  }

  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: RequestWithUser) {
    const { user } = req;
    if (user.role === AppRoles.USER && user.id !== +id) {
      throw new ForbiddenException('Bạn không được phép thay đổi người dùng khác');
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @UseRoles({
    resource: 'users',
    action: 'delete',
    possession: 'any',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
