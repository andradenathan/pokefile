import { Prisma, Pokemon } from "@prisma/client";
import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import prismaClient from "../../database/prisma";

import PokemonService from "./pokemon.service";

interface PokemonResponseData {
    name: string;
    weight: number;
    height: number;
    sprites: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
    }
    stats: Array<{
        base_stat: number;
        stat: {
            name: string;
        }
    }>
    types: Array<{
        type: {
            name: string;
        }
    }>
}

@injectable()
export class PokemonRepository {
    constructor(private readonly pokemonService: PokemonService) {}

    async all(): Promise<Pokemon[]> {
        return await prismaClient.pokemon.findMany();
    }

    async find(id: number): Promise<Pokemon | null> {
        return await prismaClient.pokemon.findUnique({where: {id: id}});
    }
    
    async getAllPokemonsAndStore(): Promise<string> {
        for(let i = 1; i < 152; i++) {
            const { data }: AxiosResponse<PokemonResponseData> 
            = await this.pokemonService.getAllPokemons(i);                                    
        
            const pokemonData = {
                name: data.name,
                weight: data.weight,
                height: data.height,
                baseAttack: 0,
                baseDefense: 0,
                baseSpecialAttack: 0,
                baseSpecialDefense: 0,
                baseSpeed: 0,
                baseHp: 0,
            }

            data.stats.forEach((status) => {
                switch(status.stat.name) {
                    case 'hp':
                        pokemonData['baseHp'] = status.base_stat;
                        break;
                    case 'attack':
                        pokemonData['baseAttack'] = status.base_stat;
                        break;
                    case 'defense':
                        pokemonData['baseDefense'] = status.base_stat;
                        break;
                    case 'special-attack':
                        pokemonData['baseSpecialAttack'] = status.base_stat;
                        break;
                    case 'special-defense':
                        pokemonData['baseSpecialDefense'] = status.base_stat;
                        break;
                    case 'speed':
                        pokemonData['baseSpeed'] = status.base_stat;
                        break;
                }
            });

            await prismaClient.pokemon.create({data: pokemonData});

            const typesData = {
                name: '',
                pokemonName: data.name,
            }

            data.types.forEach(async(type) => {
                typesData.name = type.type.name
                await prismaClient.type.create({data: typesData});
            });

            // const imagesData = {
            //     path: '',
            //     pokemonId: i
            // }

            // for(let image of Object.entries(data.sprites)) {
            //     imagesData.path = image[1];
                
            //     await prismaClient.image.create({data: imagesData});
            // }
        }

        return "Pokémons registrados com sucesso!";
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