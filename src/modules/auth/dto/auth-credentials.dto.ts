import { ApiProperty } from '@nestjs/swagger';
import { IsValid } from '@decorators/validation.decorator';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsValid()
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 50 })
  email: string;

  @IsValid()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Abc3xamp!e',
    description: 'password must have at least 10 characters and at least one of each (A-Z, a-z, 0-9, !-@-$-*)',
  })
  password: string;
}
