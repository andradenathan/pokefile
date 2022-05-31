import { injectable } from 'inversify';
import prismaClient from '../../database/prisma';
import api from '../../services/api';
import { PokemonRepository } from './pokemon.repository';



@injectable()
export default class PokemonService {
    constructor() {}

    async getAllPokemons(id: number) {
        return await api.get(`/pokemon/${id}`);
    }
}