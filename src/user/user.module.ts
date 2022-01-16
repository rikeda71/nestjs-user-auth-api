import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [PrismaService],
  exports: [UserService],
})
export class UserModule {}
