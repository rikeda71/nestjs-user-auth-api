import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ userId: number; username: string } | null> {
    const user = await this.userService.getWithUserName(username);
    // TODO: add hash
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
