import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponseModel } from '@interfaces/index';

export class AuthResponseModel implements IAuthResponseModel {
  @ApiProperty()
  accessToken: string;
}
