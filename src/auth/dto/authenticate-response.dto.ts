import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateResponseDto {
  @IsString()
  @IsNotEmpty()
  access_token!: string;
}
