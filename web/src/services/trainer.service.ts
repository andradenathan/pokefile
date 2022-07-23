import { ITrainerData } from "../models/trainer";
import { api } from "./api";
import { PokemonImages } from "./pokedex.service";

export interface IRegisterFormData extends Omit<ITrainerData, "code"> {
    birthday: Date;
    password: string;
    passwordRepeat?: string;
}

export interface ITrainerResponse {
    data: {
        success?: {
            user: ITrainerData[];
            token?: string;
        }
        error?: string;
    }
}

export interface IBag {
    id: number;
    attack: number;    
    specialAttack: number;
    defense: number;
    specialDefense: number;
    speed: number;
    hp: number;
    level: number;
    pokemonId: number;
    pokemon: {
        id: number;
        name: string;
        image: PokemonImages[];
    }
}
export interface ITrainerBagResponse {
    data: {
        success?: {
            bag: IBag[];
        }
        error?: string;
    }
}

export interface ICodeData {
    code: string;
}

export function create(registerData: Omit<IRegisterFormData, "passwordRepeat">): Promise<ITrainerResponse> {
    return api.post("/users", registerData);
}

export function getTrainers(): Promise<ITrainerResponse> {
  return api.get("/users");
}

export function getTrainer(codeData: ICodeData): Promise<ITrainerResponse> {
    return api.get(`/users/${codeData.code}`);
}

export function getTrainerBag(code: number): Promise<ITrainerBagResponse> {
    return api.get(`users/bags/${code}`);
}

export function searchTrainer(name: string): Promise<ITrainerResponse> {
    return api.get(`/users/search/${name}`);
}

export function addPokemon(code: number, pokemonId: number): Promise<ITrainerBagResponse> {
    return api.get(`users/bags/${code}/${pokemonId}`);
}

export function removePokemon(bagId: number): Promise<string> {
    return api.delete(`users/bags/${bagId}`);
}