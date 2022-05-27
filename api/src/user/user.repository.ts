import { Prisma, User } from "@prisma/client";
import prisma from "../../prisma/prisma";

export default class UserRepository {
    public async index(): Promise<User[]> {
        return await prisma.user.findMany();
    }

    public async store(data: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({data: data});
    }

    public async find(id: number): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    public async update(id: number, data: Prisma.UserUpdateInput): Promise<User> 
    {
        return await prisma.user.update({
            where: {
                id: id,
            },
            data: data
        });   
    }

    public async delete(id: number): Promise<void> {
        await prisma.user.delete({
            where: {
                id: id
            }
        });
    }
}