import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { PublicApi } from './auth/public-api.decorator';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 認証用のエンドポイントは公開
  @PublicApi()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // LocalStrategy.validate() から返却された値は Request オブジェクトに付与される
    // jwt を返す
    return this.authService.login(req.user);
  }

  @PublicApi()
  @Post('auth/signup')
  async signup(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    // ユーザを作成後、jwt を返す
    // まだユーザは作成されていないので LocalAuthGuard はつけない
    const user = await this.userService.createUser(username, password);
    return this.authService.login({
      userId: user.userId,
      username: user.username,
    });
  }

  @Get('profile')
  getProfile(@Request() req) {
    // JwtStrategy.validate() 内に認証情報が含まれているのでそれを返している
    return req.user;
  }
}
