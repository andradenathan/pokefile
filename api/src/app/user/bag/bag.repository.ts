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

    async findPokemonInTeam(userCode: number) {
        return await prismaClient.bag.findMany({
            include: {
                pokemon: {
                    include: {
                        image: true,
                    }
                }
            },
            where: {
                userCode: userCode,
                isTeam: {
                    equals: true
                }
            }
        });
    }

    async add(data: Prisma.BagCreateInput): Promise<Bag> {
        return await prismaClient.bag.create({data: data});
    }

    async remove(bagId: number): Promise<void> {
        await prismaClient.bag.delete({where: {id: bagId}});
    }

    async addPokemonInTeam(userCode: number, bagId: number) {
        const countPokemonInTeam = await prismaClient.bag.count({where: {
            userCode: userCode,
            isTeam: {
                equals: true
            }
        }});

        if(countPokemonInTeam >= 6) {
            throw new Error("You can't add more than 6 pokemon in your team");
        }

        return await prismaClient.bag.update({
            where: {
                id: bagId
            },
            data: {
                isTeam: true,
            }
        });
    }

    async addPokemonAsFavorite(bagId: number) {
        await prismaClient.bag.update({
            where: {
                id: bagId
            },
            data: {
                isFavorite: true,
            }
        });
    }
}