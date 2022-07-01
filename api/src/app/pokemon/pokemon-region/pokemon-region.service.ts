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

    async execute(): Promise<void> {
        const FIRST_GENERATION_LAST_POKEMON_ID = 100;
        const pokemonRegions = [];
        for (let idx = 1; idx < FIRST_GENERATION_LAST_POKEMON_ID; idx++) {
            //WIP
        }

    }

    private _getPokemonEncounters(): Promise<IPokemonEncounters> {
        return api.get("/api/v2/encounters");
    }    
}