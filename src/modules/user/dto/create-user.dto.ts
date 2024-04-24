import { RoleEnum } from '@enums/index';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsValid } from 'src/decorators/validation.decorator';

export class CreateUserDto {
  @IsValid()
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 50 })
  email: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 50 })
  firstName: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 50 })
  lastName: string;

  @IsValid()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Abc3xamp!e',
    description: 'password must have at least 10 characters and at least one of each (A-Z, a-z, 0-9, !-@-$-*)',
  })
  password: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  @ApiProperty({ type: 'enum', example: RoleEnum.ADMIN })
  role: RoleEnum;
}
