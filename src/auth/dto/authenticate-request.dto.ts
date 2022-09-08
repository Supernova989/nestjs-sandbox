import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
