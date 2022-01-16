import { Module } from '@nestjs/common';
import { HashModule } from 'src/hash/hash.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [PrismaModule, HashModule],
  exports: [UserService],
})
export class UserModule {}
