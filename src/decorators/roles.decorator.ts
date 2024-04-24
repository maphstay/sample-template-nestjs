import { RoleEnum } from '@enums/index';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
