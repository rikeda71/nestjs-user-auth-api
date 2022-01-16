import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 'local' は passport-local strategy のデフォルト名
  // AuthGuard は @nestjs/passport が自動で用意
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    // LocalStrategy.validate() から返却された値は Request オブジェクトに付与される
    // TODO: jwt で返す
    return req.user;
  }
}
