import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthenticateRequestDto } from './dto/authenticate-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async register(request: RegisterRequestDto) {
    const { email, password, username } = request;
    const hash = await this.createHash(password);
    const result = await this.userService.create({
      password: hash,
      username: username,
      email: email,
    });
  }

  async authenticate(request: AuthenticateRequestDto) {
    const user = await this.userService.getUserByEmail(request.email);
    if (!user) {
      throw new ForbiddenException('Incorrect email/password');
    }
    if (!(await this.compareHash(request.password, user.password))) {
      throw new ForbiddenException('Incorrect email/password');
    }
    return await this.signToken(user._id, user.email);
  }

  async createHash(text: string, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(text, salt);
  }

  async compareHash(text: string, hash: string) {
    return await bcrypt.compare(text, hash);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      email,
      sub: userId,
    };
    const secret = this.configService.get<string>('SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '2d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
