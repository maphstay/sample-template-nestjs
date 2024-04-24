import { ApiProperty } from '@nestjs/swagger';
import { IBaseResponse } from '@interfaces/index';

export class BaseResponseModel implements IBaseResponse {
  @ApiProperty()
  message: string;
}
