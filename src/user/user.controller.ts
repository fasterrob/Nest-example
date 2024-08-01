import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.userService.create(registerDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    const user = this.userService.findByEmail(req.user.email);
    return user;
  }
}
