import { Prisma } from "@prisma/client";
import { Axios, AxiosResponse } from "axios";
import { injectable } from "inversify";
import prismaClient from "../../../database/prisma";
import api from "../../../services/api";
import { RegionRepository } from "../../region/region.repository";
import { PokemonRepository } from "../pokemon.repository";

interface IPokemonEncounter {
  location_area: {
    name: string;
  };
}

interface IPokemonEncountersResponseData extends AxiosResponse {
  data: Array<IPokemonEncounter>;
}

interface IPokemonChances {
  [key: string]: number;
}

interface IPokemonLocationArea {
  pokemon: {
    name: string;
    chance: number;
  };
  version_details: Array<{
    encounter_details: Array<{
      chance: number;
    }>;
  }>;
}

interface IPokemonLocationAreaResponseData {
  data: {
    pokemon_encounters: Array<IPokemonLocationArea>;
  };
}

@injectable()
export class PokemonRegionService {
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly regionRepository: RegionRepository
  ) {}

  async execute(): Promise<Array<Prisma.PokemonRegionCreateManyInput>> {
    const FIRST_GENERATION_LAST_POKEMON_ID = 100;
    const pokemonRegions: Prisma.PokemonRegionCreateManyInput[] = [];
    for (let idx = 1; idx < 2; idx++) {
      const { data }: IPokemonEncountersResponseData =
        await this._getPokemonEncounters(idx);

      const pokemon = await this.pokemonRepository.find(idx);
      const chances = await this.handleGetPokemonEncounterChance();

      data.forEach(async (encounter) => {
        let isRegionSaved = await this.regionRepository.findByLocal(
          encounter.location_area.name
        );

        if (isRegionSaved && pokemon) {
          pokemonRegions.push({
            regionId: isRegionSaved.id,
            pokemonName: pokemon.name,
            chance: chances[pokemon.name],
          });
        }
      });
    }

    return pokemonRegions;
  }

  async handleGetPokemonEncounterChance(): Promise<IPokemonChances> {
    try {
        const pokemonChances = {} as IPokemonChances;
        const regions = await this.regionRepository.all();
        regions.forEach(async (region) => {
          const { data }: IPokemonLocationAreaResponseData =
            await this._getLocationAreaByName(region.local);
          data.pokemon_encounters.forEach(async (encounter) => {
            if (
              !(await this.pokemonRepository.getPokemonByName(
                encounter.pokemon.name
              ))
            )
              return;
    
            pokemonChances[encounter.pokemon.name] =
              encounter.version_details[0].encounter_details[0].chance;
          });
        });

        return pokemonChances;
    } catch(err: any) {
        return err.message;
    }
  }

  private _getPokemonEncounters(
    id: number
  ): Promise<IPokemonEncountersResponseData> {
    return api.get(`/pokemon/${id}/encounters`);
  }

  private _getLocationAreaByName(
    locationArea: string
  ): Promise<IPokemonLocationAreaResponseData> {
    return api.get(`/location-area/${locationArea}`);
  }
}
