import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// passport-jwt によって 'jwt' という名称の AuthGuard が提供される
export class JwtAuthGuard extends AuthGuard('jwt') {}
