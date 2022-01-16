import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { DomainUser, UserService } from 'src/user/user.service';

export interface AccessToken {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<DomainUser | null> {
    const user = await this.userService.getWithUserName(username);
    console.log(user);
    // TODO: add hash
    if (user && this.hashService.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  login(user: DomainUser): AccessToken {
    const payload = { username: user.username, sub: user.userId };
    // jwtService.sign はアクセストークンを文字列で返す
    // JWT の標準に合わせるため、userId の値を保持するプロパティ sub を選択
    // sub は unique である必要があるため、id を利用
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
