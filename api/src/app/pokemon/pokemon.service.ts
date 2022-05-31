import { injectable } from 'inversify';
import api from '../../services/api';

@injectable()
export default class PokemonService {
    constructor() {}

    async getAllPokemons(id: number) {
        return await api.get(`/pokemon/${id}`);
    }
}