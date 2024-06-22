import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'firstName',
    description: 'User first name',
    type: 'string',
    example: 'John',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'lastName',
    description: 'User last name',
    type: 'string',
    example: 'Doe',
  })
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'User e-mail address',
    type: 'string',
    example: 'johndoe@example.com',
  })
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    description: 'User password',
    type: 'string',
    example: 'Password123@',
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
