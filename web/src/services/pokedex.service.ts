import { AxiosResponse } from "axios";
import { api } from "./api";
import { IBag } from "./trainer.service";

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
    pokemonName: string;
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
    bag: IBag[];
    region: IRegionData[];
    pokemon: IPokemonEvolutionData[];
}

export interface IPokemonEvolutionData {
    evolution: IPokemonData;
}

export interface IRegionData {
    localName: string;
    chance: number;
}

interface PokemonResponse extends AxiosResponse {
    data: {
        success?: {
            pokemons: IPokemonData[];
        }
        error?: string;
    }
}

export interface ITypesData {
    name: string;
}

interface TypesResponse extends AxiosResponse {
    data: {
        success?: {
            types: ITypesData[];
        }
        error?: string;
    }
}
  
export function pokemons(): Promise<PokemonResponse> {
    return api.get('/pokemons');
}

export function pokemonTypes(): Promise<TypesResponse> {
    return api.get('/pokemons/types');
}

export function searchByName(value: string): Promise<PokemonResponse> {
    return api.get(`/pokemons/search/name/${value}`);
}

export function filterPokemonByType(type: string): Promise<PokemonResponse> {
    return api.get(`/pokemons/search/type/${type}`);
}