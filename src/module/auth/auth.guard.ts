import {
    ExecutionContext,
    Injectable,
    UnauthorizedException, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable
export class JwtAuthGuard  extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();

        if (!request.headers.authorization) {
            return true;
        }
        return result;
    //     return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            return false; // 인증 실패시 false 리턴
        }
        // if (err || !user) {
        //       throw err || new UnauthorizedException();
        //     }
        return user
    }
}
