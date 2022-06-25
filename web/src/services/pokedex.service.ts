import { AxiosResponse } from "axios";
import { api } from "./api";

export interface PokemonImages {
    id: number;
    path: string;
    pokemonId: IPokemonData["id"];
}

export interface PokemonTypes {
    id: number;
    name: string;
    pokemonName: string;
}

export interface IPokemonData {
    id: number;
    name: string;
    weight: number;
    height: number;
    baseAttack: number;
    baseSpecialAttack: number;
    baseDefense: number;
    baseSpecialDefense: number;
    baseSpeed: number;
    baseHp: number;

    image: PokemonImages[];
    type: PokemonTypes[];
    // bag: IBagData[];
    // region: IRegionData[];
    // pokemon: IPokemonData[];
}

interface PokemonResponse extends AxiosResponse {
    data: {
        success?: {
            pokemons: IPokemonData[];
        }
        error?: string;
    }
}

export function pokemons(): Promise<PokemonResponse> {
    return api.get('/pokemons');
}