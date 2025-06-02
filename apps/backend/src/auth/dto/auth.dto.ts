import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(8)
  password?: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
} 