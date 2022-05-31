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
    
    async getAllPokemonsAndStore(): Promise<string> {
        const FIRST_SEASON_LAST_POKEMON_ID = 152;

        for(let i = 1; i < FIRST_SEASON_LAST_POKEMON_ID; i++) {
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

            data.types.forEach(async(type) => {
                const typesData = {
                    name: type.type.name,
                    pokemonName: data.name,
                }

                await prismaClient.type.create({data: typesData});
            });

            for(let image of Object.entries(data.sprites)) {
                if(image[1] != null && typeof image[1] === 'string') {
                    if(image[1].endsWith('.png')) {
                        const imagesData = {
                            path: image[1],
                            pokemonId: i,
                        }
    
                        await prismaClient.image.create({data: imagesData});
    
                    } else {
                        continue;
                    }
                } else {
                    continue;
                }
            }
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