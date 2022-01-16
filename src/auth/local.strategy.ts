import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { DomainUser } from 'src/user/user.service';
import { AuthService } from './auth.service';

// PassportStrategy に沿った実装
// ref. http://www.passportjs.org/docs/configure/
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      // username, password のフィールド名を変更したい時
      // 例えばメールアドレス認証だと以下のようにすれば良い
      // usernameField: 'email',
      // passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<DomainUser> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
