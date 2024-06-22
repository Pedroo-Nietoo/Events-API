import { $Enums, Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: $Enums.Role;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
