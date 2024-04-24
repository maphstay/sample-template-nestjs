import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from '@interfaces/index';
import { IAuthService } from './interfaces/auth-service.interface';
import { IUserService } from '@modules/user/interfaces/user-service.interface';
import { AuthResponseModel } from './models/auth-response.model';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async login(authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseModel> {
    const user = await this.userService.findToLogin(authCredentialsDto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!(await bcrypt.compare(authCredentialsDto.password, user.password)))
      throw new UnauthorizedException('Invalid credentials');
    delete user.password;
    const payload: JwtPayload = { user };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
