import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: any,
  ) {
    const access_token = await this.authService.login(email, password);
    res.cookie('access_token', access_token, { httpOnly: true });
    return access_token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    const user = {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      password: req.user.password,
      role: req.user.role,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    };
    return user;
  }

  @Get('logout')
  logout(@Response() res: any) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.send('Logout success!');
  }
}
