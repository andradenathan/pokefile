import { Axios, AxiosResponse } from "axios";
import { injectable } from "inversify";
import prismaClient from "../../../database/prisma";
import api from "../../../services/api";
import { PokemonRepository } from "../pokemon.repository";

interface IPokemonEncounter {
    location_area: {
        name: string;
    }
}

interface IPokemonEncounters extends AxiosResponse {
    data: Array<IPokemonEncounter>;
}

@injectable()
export class PokemonRegionService {
    constructor(private readonly pokemonRepository: PokemonRepository) {}

    async execute() {
        const FIRST_GENERATION_LAST_POKEMON_ID = 100;
        const regions = [];
        const pokemonRegions = [];
        for (let idx = 1; idx < 2; idx++) {
            const { data }: IPokemonEncounters = await this._getPokemonEncounters(idx);
            data.forEach((encounter) => {
                if(encounter.location_area.name.includes("johto")) return;
                if(encounter.location_area.name.includes("sinnoh")) return;
                
                regions.push({
                    
                });

            });            

        }

        return data;
    }

    private _getPokemonEncounters(id: number): Promise<IPokemonEncounters> {
        return api.get(`/pokemon/${id}/encounters`);
    }    
}