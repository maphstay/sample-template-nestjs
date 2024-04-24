import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user-service.interface';
import { IUserRepository } from './interfaces/user-repository.interface';
import { User } from './entities/user.entity';
import { PaginationDto } from '@bases/pagination/pagination.dto';
import { IPaginatedResponse } from '@interfaces/index';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const userExist = await this.userRepository.findOneBy({ where: { email: createUserDto.email } });

    if (userExist) throw new ConflictException('Email already registered');

    await this.userRepository.createAndSave(createUserDto);

    return { message: 'User created successfully' };
  }

  public async findAll(paginationDto: PaginationDto): Promise<IPaginatedResponse<User>> {
    const [users, count] = await this.userRepository.findAndCount({
      take: paginationDto.limit,
      skip: (paginationDto.page - 1) * paginationDto.limit,
    });

    return {
      metadata: {
        page: paginationDto.page,
        limit: paginationDto.limit,
        totalItens: count,
        totalPages: Math.ceil(count / paginationDto.limit),
      },
      data: users,
    };
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  public async findToLogin(email: string): Promise<User> {
    return await this.userRepository.findOneBy({
      where: {
        email,
      },
      select: ['id', 'email', 'role', 'password', 'firstName', 'lastName'],
    });
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.update({ id }, updateUserDto);
  }

  public async delete(id: string): Promise<{ message: string }> {
    await this.userRepository.delete(id);
    return { message: 'User removed successfully' };
  }
}
