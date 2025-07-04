import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Patch,
  Delete,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto, UpdateUserDto } from './dto/auth.dto';
import { AuthResponse } from './types/auth.types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: SignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@User('id') userId: string): Promise<void> {
    return this.authService.logout(userId);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@User('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(userId, dto);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteMe(@User('id') userId: string) {
    return this.authService.deleteUser(userId);
  }
} 