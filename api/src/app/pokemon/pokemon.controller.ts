import { Pokemon } from "@prisma/client";

import { 
    Request, 
    Response 
} from "express";
import { injectable } from "inversify";

import { 
    controller, 
    httpDelete, 
    httpGet, 
    httpPost, 
    httpPut 
} from "inversify-express-utils";
import { PokemonRepository } from "./pokemon.repository";


@controller('/pokemons')
export default class PokemonController {
    constructor(private readonly pokemonRepository: PokemonRepository) {}
    
    @httpGet('/')
    async all(request: Request, response: Response) {
        try {
            const pokemons = await this.pokemonRepository.all();
            return response.status(200).json({success: {pokemons: pokemons}});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }

    @httpGet('/populate')
    async populate(request: Request, response: Response) {
        try {
            const pokemons = await this.pokemonRepository.getAllPokemonsAndStore();
            return response.status(200).json({success: {pokemons: pokemons}});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }
}