import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { jwtConstants } from './constants';

// PassportStrategy に沿った実装
// ref. http://www.passportjs.org/docs/configure/
@Injectable()
// Strategy は passport-jwt のものであることに注意
// 各ライブラリごとに 'Strategy' というクラス名で提供されている
// ストラテジ名を明示的にしたい場合は以下のようにすると良い
// export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt') {
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // ref. https://github.com/mikenicholson/passport-jwt#configure-strategy
    const options: StrategyOptions = {
      // RequestからJWTを抽出する方法を指定。APIリクエストのAuthorization Bearerトークンから取得
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // デフォルト：false。期限切れになっていないことをPassportモジュールで確認
      ignoreExpiration: false,
      // トークンに署名するためのシンメトリックなsecret
      // PEMエンコードされた公開鍵などを指定する方が良い場合がある
      secretOrKey: jwtConstants.secret,
      algorithms: ['HS256'],
    };
    super(options);
  }

  async validate(payload: { username: string; sub: number }) {
    return { userId: payload.sub, username: payload.username };
  }
}
