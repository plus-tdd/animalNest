import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header의 Bearer 이름 가진 토큰을 알아서 추출해옴
            secretOrKey: 'animal',
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: any) {
        return payload;
    }
}