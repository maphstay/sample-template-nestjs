import { PaginationDto } from '@bases/pagination/pagination.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { IPaginatedResponse } from '@interfaces/index';

export abstract class IUserService {
  abstract create(createUserDto: CreateUserDto): Promise<{ message: string }>;
  abstract findAll(paginationDto: PaginationDto): Promise<IPaginatedResponse<User>>;
  abstract findOne(id: string): Promise<User>;
  abstract findToLogin(email: string): Promise<User>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<{ message: string }>;
}
