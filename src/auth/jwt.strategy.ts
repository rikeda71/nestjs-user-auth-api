import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

// PassportStrategy に沿った実装
// ref. http://www.passportjs.org/docs/configure/
@Injectable()
// Strategy は passport-jwt のものであることに注意
// 各ライブラリごとに 'Strategy' というクラス名で提供されている
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // ref. https://github.com/mikenicholson/passport-jwt#configure-strategy
    super({
      // RequestからJWTを抽出する方法を指定。APIリクエストのAuthorization Bearerトークンから取得
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // デフォルト：false。期限切れになっていないことをPassportモジュールで確認
      ignoreExpiration: false,
      // トークンに署名するためのシンメトリックなsecret
      // PEMエンコードされた公開鍵などを指定する方が良い場合がある
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { username: string; sub: number }) {
    return { userId: payload.sub, username: payload.username };
  }
}
