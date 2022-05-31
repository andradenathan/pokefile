import { Prisma } from '@prisma/client';
import { PrismaMapType } from '../../services/prisma-map-type.interface';

export class UserTypeMap implements PrismaMapType {
  aggregate!: Prisma.UserAggregateArgs;
  count!: Prisma.UserCountArgs;
  create!: Prisma.UserCreateArgs;
  delete!: Prisma.UserDeleteArgs;
  deleteMany!: Prisma.UserDeleteManyArgs;
  findFirst!: Prisma.UserFindFirstArgs;
  findMany!: Prisma.UserFindManyArgs;
  findUnique!: Prisma.UserFindUniqueArgs;
  update!: Prisma.UserUpdateArgs;
  updateMany!: Prisma.UserUpdateManyArgs;
  upsert!: Prisma.UserUpsertArgs;
}