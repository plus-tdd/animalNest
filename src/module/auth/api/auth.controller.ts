import { Controller, Request, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from "./auth.dto";
import { AuthService } from "../domain/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('login')
    login(@Body() loginDto : LoginDto) {
        return this.authService.login(loginDto)
    }
}
