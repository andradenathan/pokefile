import { Prisma, PokemonEvolution } from "@prisma/client";
import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import prismaClient from "../../../database/prisma";
import api from "../../../services/api";

interface IPokemonEvolutionChainResponseData extends AxiosResponse {
    data: {
        chain: {
            evolves_to: Array<{
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

@injectable()
export class PokemonEvolutionService {
    constructor() { }

    async execute(): Promise<string> {
        const FIRST_SEASON_LAST_POKEMON_ID = 1;
        for (let idx = 1; idx < FIRST_SEASON_LAST_POKEMON_ID; idx++) {
            const { data }: IPokemonEvolutionChainResponseData
                = await this._getAllEvolutionChains(idx);
            console.log(data);
        }

        return '';
    }

    private async _getAllEvolutionChains(id: number) {
        return api.get(`/evolution-chain/${id}`);
    }
}