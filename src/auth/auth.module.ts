import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { HashModule } from 'src/hash/hash.module';

@Module({
  // PassportModule, JwtModule を認証認可のために利用
  // UserModule はユーザー情報を DB から取得するためのモジュール群
  imports: [
    UserModule,
    PassportModule,
    HashModule,
    // ref. https://github.com/nestjs/jwt/blob/master/README.md
    // 設定値： https://github.com/auth0/node-jsonwebtoken#usage
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { algorithm: 'HS256', expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // グローバルガードにしたい場合は以下のように設定
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
