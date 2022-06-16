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
                    },
                }>,
                species: {
                    name: string;
                }
            }>,
            species: {
                name: string;
            },
        },
    },
}

@injectable()
export class PokemonEvolutionService {
    constructor(private readonly pokemonRepository: PokemonRepository) { }

    async execute(): Promise<Array<any>> {
        const FIRST_GENERATION_LAST_POKEMON_ID = 100;
        const pokemonEvolutions = [];
        for (let idx = 1; idx < FIRST_GENERATION_LAST_POKEMON_ID; idx++) {
            const { data }: IPokemonEvolutionChainResponseData
                = await this._getAllEvolutionChains(idx);

            const isStoredPokemon = await this.pokemonRepository.getPokemonByName(data.chain.species.name);

            if (!isStoredPokemon) continue;

            if (data.chain.evolves_to.length <= 0) continue;

            for (let evo = 0; evo < data.chain.evolves_to.length; evo++) {
                const evolution = data.chain.evolves_to[evo];

                const isEvolutionStored = await this
                    .pokemonRepository
                    .getPokemonByName(evolution.species.name);

                if (!isEvolutionStored) continue;

                pokemonEvolutions.push({
                    pokemonName: data.chain.species.name,
                    pokemonEvolutionName: evolution.species.name
                });
            }

            if (data.chain.evolves_to[0].evolves_to.length <= 0) continue;

            const isEvolutionEvolutionStored = await this
                .pokemonRepository
                .getPokemonByName(data.chain.evolves_to[0].evolves_to[0].species.name);


            if (!isEvolutionEvolutionStored) continue;

            pokemonEvolutions.push({
                pokemonName: data.chain.evolves_to[0].species.name,
                pokemonEvolutionName: data.chain.evolves_to[0].evolves_to[0].species.name
            });
        }


        await prismaClient.pokemonEvolution.createMany({ data: pokemonEvolutions });

        return pokemonEvolutions;
    }

    private async _getAllEvolutionChains(id: number) {
        return api.get(`/evolution-chain/${id}`);
    }
}