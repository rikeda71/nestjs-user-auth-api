import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { HashModule } from './hash/hash.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, HashModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
