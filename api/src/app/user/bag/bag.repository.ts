import { injectable } from "inversify";
import prismaClient from "../../../database/prisma";
import { Prisma, Bag } from "@prisma/client";

@injectable()
export class BagRepository {
    async find(code: number): Promise<Bag[] | null> {
        return await prismaClient.bag.findMany({
                include: {
                    pokemon: {
                        include: {
                            image: true
                        },
                    },
                },
                where: {userCode: code}
        });
    }

    async add(data: Prisma.BagCreateInput): Promise<Bag> {
        return await prismaClient.bag.create({data: data});
    }

    async remove(bagId: number): Promise<void> {
        await prismaClient.bag.delete({where: {id: bagId}});
    }

    async addPokemonInTeam(pokemonId: number) {
        
    }
}