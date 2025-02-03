import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PageOptionsDto } from '../shared/dto/page-options.dto';
import { PageMetaDto } from '../shared/dto/page-meta.dto';
import { parseSearchParams } from '../utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const hashedPassword = bcrypt.hashSync(createUserDto.hashedPassword, 10);
    return this.prismaService.user.create({ data: { ...createUserDto, hashedPassword, role: 'user' } });
  }

  async findAll(query: PageOptionsDto) {
    const { s, limit, page, offset, sort } = query;
    let where: any;
    let sortBy: string;
    let sortOrder: string;
    if (s) {
      const parseS = JSON.parse(s);
      if (parseS['$and'].length > 0) {
        const role = parseSearchParams(parseS['$and'], 'role');
        where = {
          role,
        };
      }
    }
    if (sort) {
      const [firstValue, secondValue] = sort[0].split(',');
      sortBy = firstValue;
      sortOrder = secondValue.toLowerCase();
    }

    const defaultQuery = this.prismaService.user.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        ...(sort
          ? {
              [sortBy]: sortOrder,
            }
          : {
              createdAt: 'desc',
            }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        isActive: true,
      },
    });

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.user.count({
        where,
      }),
      defaultQuery,
    ]);

    return new PageMetaDto(page, limit, count, data);
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        isActive: true,
        role: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.hashedPassword) {
      updateUserDto.hashedPassword = bcrypt.hashSync(updateUserDto.hashedPassword, 10);
    } else updateUserDto.hashedPassword = undefined;
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    return;
  }

  async remove(id: string) {
    const checkId = id.split('-');
    if (checkId.length > 1) {
      const userInfo = await this.prismaService.user.findUnique({
        where: {
          id: Number(checkId[0]),
        },
      });
      return this.prismaService.user.update({
        where: {
          id: Number(checkId[0]),
        },
        data: {
          isActive: userInfo.isActive ? false : true,
        },
      });
    }
    return this.prismaService.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
