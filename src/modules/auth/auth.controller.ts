import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { IAuthService } from './interfaces/auth-service.interface';
import { ApiCustomBadRequestResponse, ApiCustomOkResponse } from '@decorators/index';
import { AuthResponseModel } from './models/auth-response.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @ApiCustomOkResponse({
    type: AuthResponseModel,
    description: 'User authenticated successfully',
  })
  @ApiCustomBadRequestResponse()
  async login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseModel> {
    return this.authService.login(authCredentialsDto);
  }
}
