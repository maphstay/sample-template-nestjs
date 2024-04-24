import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { RoleEnum } from '@enums/index';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John' })
  @Column({ name: 'first_name' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Column({ name: 'last_name' })
  lastName: string;

  @ApiProperty({ uniqueItems: true, example: 'john_doe@contoso.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'Abc123@4' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ type: 'enum', enum: RoleEnum })
  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashField(): Promise<void> {
    const encrypt = async (field: string): Promise<void> => {
      try {
        this[`${field}`] = await bcrypt.hash(this[`${field}`], 10);
      } catch (e) {
        throw new InternalServerErrorException('Something went wrong in password hashing');
      }
    };
    if (this.password) await encrypt('password');
  }
}
