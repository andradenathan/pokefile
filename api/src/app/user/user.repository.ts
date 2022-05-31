import { Prisma, User } from "@prisma/client";
import { injectable } from "inversify";
import prismaClient from "../../database/prisma";

@injectable()
export class UserRepository {
    async all(): Promise<User[]> {
        return await prismaClient.user.findMany();
    }

    async find(code: number): Promise<User | null> {
        return await prismaClient.user.findUnique({where: {code: code}});
    }
    
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await prismaClient.user.create({data: data});
    } 
    
    async update(code: number, data: Prisma.UserUpdateInput): Promise<User> {
        return await prismaClient.user.update(
            {
                where: {code: code}, 
                data: data
            }
        );
    }

    async delete(code: number): Promise<void> {
        await prismaClient.user.delete({where: {code: code}});
    }
}