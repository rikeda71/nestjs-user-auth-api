import { Injectable } from '@nestjs/common';
import { DomainUser, UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<DomainUser | null> {
    const user = await this.userService.getWithUserName(username);
    // TODO: add hash
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
