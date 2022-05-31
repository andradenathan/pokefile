import { AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import prismaClient from '../../database/prisma';
import api from '../../services/api';

interface PokemonResponseData {
    name: string;
    weight: number;
    height: number;
    sprites: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
    }
    stats: Array<{
        base_stat: number;
        stat: {
            name: string;
        }
    }>
    types: Array<{
        type: {
            name: string;
        }
    }>
}

@injectable()
export default class PokemonService {
    constructor() {}

    private async _getAllPokemons(id: number) {
        return await api.get(`/pokemon/${id}`);
    }

    async execute(): Promise<string> {
        const FIRST_SEASON_LAST_POKEMON_ID = 152;

        for(let i = 1; i < FIRST_SEASON_LAST_POKEMON_ID; i++) {
            const { data }: AxiosResponse<PokemonResponseData> 
                = await this._getAllPokemons(i);                                    
        
            await this.handlePokemonStatus(data);
            await this.handlePokemonTypes(data);
            await this.handlePokemonImages(i, data);
        }

        return "Pokémons registrados com sucesso!";
    }
    

    async handlePokemonStatus(data: PokemonResponseData): Promise<void> {
        const pokemonData = {
            name: data.name,
            weight: data.weight,
            height: data.height,
            baseAttack: 0,
            baseDefense: 0,
            baseSpecialAttack: 0,
            baseSpecialDefense: 0,
            baseSpeed: 0,
            baseHp: 0,
        }

        data.stats.forEach((status) => {
            switch(status.stat.name) {
                case 'hp':
                    pokemonData['baseHp'] = status.base_stat;
                    break;
                case 'attack':
                    pokemonData['baseAttack'] = status.base_stat;
                    break;
                case 'defense':
                    pokemonData['baseDefense'] = status.base_stat;
                    break;
                case 'special-attack':
                    pokemonData['baseSpecialAttack'] = status.base_stat;
                    break;
                case 'special-defense':
                    pokemonData['baseSpecialDefense'] = status.base_stat;
                    break;
                case 'speed':
                    pokemonData['baseSpeed'] = status.base_stat;
                    break;
            }
        });

        await prismaClient.pokemon.create({data: pokemonData});
    }

    async handlePokemonTypes(data: PokemonResponseData): Promise<void> {
        data.types.forEach(async(type) => {
            const typesData = {
                name: type.type.name,
                pokemonName: data.name,
            }

            await prismaClient.type.create({data: typesData});
        });
    }


    async handlePokemonImages(id: number, data: PokemonResponseData): Promise<void> {
        for(let image of Object.entries(data.sprites)) {
            if(image[1] == null || typeof image[1] !== 'string') continue;

            if(image[1].endsWith('.png')) {
                const imagesData = {
                    path: image[1],
                    pokemonId: id,
                }
                await prismaClient.image.create({data: imagesData});
            }
        }
    }
}