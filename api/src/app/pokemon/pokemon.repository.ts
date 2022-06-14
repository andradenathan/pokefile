import { Prisma, Pokemon } from "@prisma/client";
import { injectable } from "inversify";
import prismaClient from "../../database/prisma";

import PokemonService from "./pokemon.service";

@injectable()
export class PokemonRepository {
    constructor(private readonly pokemonService: PokemonService) {}

    async all(): Promise<Pokemon[]> {
        return await prismaClient.pokemon.findMany({
            include: {
                image: true,
                type: true,
                pokemon: true,
            }
        });
    }

    async find(id: number): Promise<Pokemon | null> {
        return await prismaClient.pokemon.findUnique({where: {id: id}});
    }
    
    async update(id: number, data: Prisma.PokemonUpdateInput): Promise<Pokemon> {
        return await prismaClient.pokemon.update(
            {
                where: {id: id}, 
                data: data
            }
        );
    }

    async delete(id: number): Promise<void> {
        await prismaClient.pokemon.delete({where: {id: id}});
    }

    async getPokemonByName(name: string): Promise<Pokemon | null> {
        return await prismaClient.pokemon.findFirst({where: {name: name}});
    }
}