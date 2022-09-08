import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthenticateRequestDto } from './dto/authenticate-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}
  async register(request: RegisterRequestDto) {
    const secret = this.configService.get<string>('SECRET');

    await this.createHash('password');
  }

  async authenticate(request: AuthenticateRequestDto) {
    await this.compareHash('asfa', 'asfaf');
  }

  async createHash(text: string, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(text, salt);
  }

  async compareHash(text: string, hash: string) {
    return await bcrypt.compare(text, hash);
  }
}
