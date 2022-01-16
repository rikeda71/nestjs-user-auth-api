import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PUBLIC_API_KEY } from './public-api.decorator';

@Injectable()
// passport-jwt によって 'jwt' という名称の AuthGuard が提供される
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // セッションを作りたい時は super.logIn(request) などを使う
    // @PublicApi デコレータが付与されているエンドポイントは強制的に認証を飛ばす
    const isPublicApi = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_API_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublicApi) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: any,
    status?: any,
  ): TUser {
    // err をもとに例外を投げれる
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
