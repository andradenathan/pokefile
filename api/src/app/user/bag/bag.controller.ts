import { Request, Response } from "express";
import {
    controller,
    httpDelete,
    httpGet,
    httpPut,
} from "inversify-express-utils";
import { PokemonRepository } from "../../pokemon/pokemon.repository";
import { BagRepository } from "./bag.repository";

@controller('/users/bags')
export default class BagController {
    constructor(
        private readonly bagRepository: BagRepository,
        private readonly pokemonRepository: PokemonRepository
    ) { }

    @httpGet('/:code')
    async find(request: Request, response: Response): Promise<Response> {
        const code = parseInt(request.params.code);
        try {
            const bags = await this.bagRepository.find(code);
            return response.status(200).json({ success: { bag: bags } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpGet('/:code/team')
    async findPokemonInTeam(request: Request, response: Response): Promise<Response> {
        const code = parseInt(request.params.code);
        try {
            const bags = await this.bagRepository.findPokemonInTeam(code);
            return response.status(200).json({ success: { bag: bags } });
        } catch(err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpGet('/:code/:pokemonId')
    async add(request: Request, response: Response): Promise<Response> {
        const pokemon = await this.pokemonRepository.find(parseInt(request.params.pokemonId));
        if(!pokemon) return response.status(422).json({ error: { message: "Pokemon not found" } });

        const bagData = {
            userCode: parseInt(request.params.code),
            pokemonId: parseInt(request.params.pokemonId),
            attack: pokemon.baseAttack,
            defense: pokemon.baseDefense,
            hp: pokemon.baseHp,
            speed: pokemon.baseSpeed,
            specialDefense: pokemon.baseSpecialDefense,
            specialAttack: pokemon.baseSpecialAttack,
            isShiny: false,
            pokemonGender: "M",
            level: 1,
        }

        try {
            //@ts-ignore
            const bag = await this.bagRepository.add(bagData);
            return response.status(200).json({ success: { bag: bag } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpDelete('/:bagId')
    async remove(request: Request, response: Response): Promise<Response> {
        const bagId = parseInt(request.params.bagId);

        try {
            await this.bagRepository.remove(bagId);
            return response.status(200).json({ success: { bag: "Pokemon successfully deleted" } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpPut('/:code/:bagId')
    async addPokemonInTeam(request: Request, response: Response): Promise<Response> {
        const bagId = parseInt(request.params.bagId);
        const code = parseInt(request.params.code);

        try {
            await this.bagRepository.addPokemonInTeam(code, bagId);
            return response.status(200).json({ success: { bag: "Pokemon successfully added in team" } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }
}