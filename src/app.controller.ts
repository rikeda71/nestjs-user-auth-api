import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuardGuard } from './auth/local-auth-guard.guard';
import { PublicApi } from './auth/public-api.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 認証用のエンドポイントは公開
  @PublicApi()
  @UseGuards(LocalAuthGuardGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // LocalStrategy.validate() から返却された値は Request オブジェクトに付与される
    // jwt を返す
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    // JwtStrategy.validate() 内に認証情報が含まれているのでそれを返している
    return req.user;
  }
}
