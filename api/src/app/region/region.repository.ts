import { Prisma, Region } from "@prisma/client";
import { injectable } from "inversify";
import prismaClient from "../../database/prisma";

@injectable()
export class RegionRepository {
    async all(): Promise<Region[]> {
        return await prismaClient.region.findMany();
    }

    async findByLocal(local: string): Promise<Region | null> {
        return await prismaClient.region.findFirst({where: {local: local}});
    }

    async find(id: number): Promise<Region | null> {
        return await prismaClient.region.findUnique({where: {id: id}});
    }

    async create(data: Prisma.RegionCreateInput): Promise<Region> {
        return await prismaClient.region.create({data: data});
    } 
    
    async update(id: number, data: Prisma.UserUpdateInput): Promise<Region> {
        return await prismaClient.region.update({
            where: {id: id}, 
            data: data
        });
    }

    async delete(id: number): Promise<void> {
        await prismaClient.region.delete({where: {id: id}});
    }
}