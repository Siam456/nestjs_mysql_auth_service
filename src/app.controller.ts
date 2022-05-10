import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './services/authentication/auth.service';
import { JwtAuthGuard } from './services/authentication/guards/jwt-auth.guard';
import { LocalAuthGuard } from './services/authentication/guards/local-auth.guard';
import { RolesGuard } from './services/authorization/guards/roles.guard';
import { Roles } from './services/authorization/roles.decorator';
import { UserRole } from './services/authorization/usaer.role';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    return this.authService.login(req, res);
  }

  @Roles(UserRole.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
