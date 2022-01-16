import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface DomainUser {
  userId: number;
  username: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getWithUserName(username: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { username: username },
    });
  }
}
