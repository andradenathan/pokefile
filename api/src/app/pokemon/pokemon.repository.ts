import { Prisma, Pokemon } from "@prisma/client";
import { AxiosResponse } from "axios";
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
}