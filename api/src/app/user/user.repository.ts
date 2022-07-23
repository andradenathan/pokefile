import { Prisma, User } from "@prisma/client";
import { injectable } from "inversify";
import prismaClient from "../../database/prisma";

@injectable()
export class UserRepository {
    async all(): Promise<User[]> {
        return await prismaClient.user.findMany();
    }

    async find(code: number): Promise<User | null> {
        return await prismaClient.user.findUnique({
            include: {
                bag: {
                    select: {
                        pokemon: {
                            include: {
                                image: true,
                            }
                        }
                    }
                }
            },
            where: {code: code}
        });
    }
    
    async findByEmail(email: string): Promise<User | null> {
        return await prismaClient.user.findUnique({where: {email: email}});
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        let code = this.generateCode(1, 99999);
        if(await this.find(code)) {
            data.code = this.generateCode(1, 99999);
        } else {
            data.code = code;
        }
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

     private generateCode(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }
}