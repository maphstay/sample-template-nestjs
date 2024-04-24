import { User } from '@modules/user/entities/user.entity';

export interface IPaginationMetaData {
  page: number;
  limit: number;
  totalItens: number;
  totalPages: number;
}

export interface IPaginatedResponse<T> {
  metadata: IPaginationMetaData;
  data: T[];
}

export interface JwtPayload {
  user: User;
}

export interface IAuthResponseModel {
  accessToken: string;
}

export interface IBaseResponse {
  message: string;
}

export type ClientDocumentType = 'cpf' | 'cnpj';
