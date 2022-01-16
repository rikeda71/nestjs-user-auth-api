import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [UserService],
})
export class PrismaModule {}
