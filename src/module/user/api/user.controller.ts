import { Controller, Get, Post,Body } from "@nestjs/common";
import { UserService } from "../domain/user.service";
import { SignUpDto } from "./user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService) {}

    @Post('signup')
    signUp(@Body() signUpDto : SignUpDto) {
        return this.userService.signUp(signUpDto);
    }
}
