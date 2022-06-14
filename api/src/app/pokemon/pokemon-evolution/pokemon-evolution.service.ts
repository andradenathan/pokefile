import { Prisma, PokemonEvolution } from "@prisma/client";
import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import prismaClient from "../../../database/prisma";
import api from "../../../services/api";
import { PokemonRepository } from "../pokemon.repository";

interface IPokemonEvolutionChainResponseData extends AxiosResponse {
    data: {
        chain: {
            evolves_to: Array<{
                evolves_to: Array<{
                    species: {
                        name: string;
                    };
                }>,
                species: {
                    name: string;
                }
            }>
            species: {
                name: string;
            }
        }
    }
}

interface IPokemonEvolutionsData {
    pokemonName: string;
    pokemonEvolutionName: string;
}

@injectable()
export class PokemonEvolutionService {
    constructor(private readonly pokemonRepository: PokemonRepository) { }

    async execute(): Promise<string> {
        const FIRST_SEASON_LAST_POKEMON_ID = 100;
        const pokemonEvolutions = [];
        for (let idx = 1; idx < FIRST_SEASON_LAST_POKEMON_ID; idx++) {
            const { data }: IPokemonEvolutionChainResponseData
                = await this._getAllEvolutionChains(idx);
                
            const storedPokemon = await this.pokemonRepository.getPokemonByName(data.chain.species.name);
            
            if(!storedPokemon) continue;
            
            if(data.chain.evolves_to.length <= 0) continue;

            data.chain.evolves_to.forEach(async(evolution) => {
                const isEvolutionStored = await this
                .pokemonRepository
                .getPokemonByName(evolution.species.name);
                
                if(!isEvolutionStored) return;

                pokemonEvolutions.push({
                    pokemonName: storedPokemon.name,
                    pokemonEvolutionName: evolution.species.name
                });
            })

            if(data.chain.evolves_to[0].evolves_to.length <= 0) continue;
            
            const isEvolutionEvolutionStored = await this
                .pokemonRepository
                .getPokemonByName(data.chain.evolves_to[0].species.name);

                if(!isEvolutionEvolutionStored) continue;

                pokemonEvolutions.push({
                    pokemonName: data.chain.evolves_to[0].species.name,
                    pokemonEvolutionName: data.chain.evolves_to[0].evolves_to[0].species.name
                });

            console.log(pokemonEvolutions);
        }

        await prismaClient.pokemonEvolution.createMany({data: pokemonEvolutions});
        
        return 'Evoluções registradas com sucesso!';
    }

    private async _getAllEvolutionChains(id: number) {
        return api.get(`/evolution-chain/${id}`);
    }
}