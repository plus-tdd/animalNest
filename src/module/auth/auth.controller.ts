import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Post('auth/login')
    async login(@Request() req) {
        return req.user;
    }


}
