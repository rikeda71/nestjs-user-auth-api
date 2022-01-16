import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { HashService } from 'src/hash/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';

export interface DomainUser {
  userId: number;
  username: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async getWithUserName(username: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { username: username },
    });
  }

  async createUser(username: string, password: string): Promise<User> {
    // 作成済みの場合は作らない
    const existUser = await this.getWithUserName(username);
    if (existUser) {
      return existUser;
    }
    const user = await this.prismaService.user.create({
      data: {
        username: username,
        password: this.hashService.encrypt(password),
      },
    });
    return user;
  }
}
