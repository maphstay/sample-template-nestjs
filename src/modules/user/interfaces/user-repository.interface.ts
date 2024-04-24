import { IBaseRepository } from '@bases/repository/base-repository.interface';
import { User } from '../entities/user.entity';

export abstract class IUserRepository extends IBaseRepository<User> {}
