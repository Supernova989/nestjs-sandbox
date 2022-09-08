import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticateRequestDto } from './dto/authenticate-request.dto';
import { AuthenticateResponseDto } from './dto/authenticate-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 204,
  })
  async register(@Body() body: RegisterRequestDto) {
    await this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Logs in a user' })
  @ApiResponse({
    status: 200,
    description: 'Auth result details',
    type: AuthenticateResponseDto,
  })
  async authenticate(@Body() body: AuthenticateRequestDto) {
    await this.authService.authenticate(body);
  }
}
