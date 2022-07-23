import { Prisma, Region } from "@prisma/client";
import { injectable } from "inversify";
import prismaClient from "../../../database/prisma";
import api from "../../../services/api";
import { RegionRepository } from "../../region/region.repository";
import { PokemonRepository } from "../pokemon.repository";

interface IPokemonData {
  name: string;
}

interface IVersionDetailsData {
  encounter_details: Array<{
    chance: number;
  }>;
}

interface IPokemonLocationAreaData {
  pokemon: IPokemonData;
  version_details: Array<IVersionDetailsData>;
}

interface IPokemonLocationAreaResponseData {
  pokemon_encounters: Array<IPokemonLocationAreaData>;
}

@injectable()
export class PokemonRegionService {
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly regionRepository: RegionRepository
  ) {}

  async execute(): Promise<Prisma.PokemonRegionCreateManyInput[]> {
    const regions = await this.regionRepository.all();
    const pokemonRegions = await this._handlePokemonEncounter(regions);

    await prismaClient.pokemonRegion.createMany({ data: pokemonRegions });

    return pokemonRegions;
  }

  private async _handlePokemonEncounter(
    regions: Region[]
  ): Promise<Prisma.PokemonRegionCreateManyInput[]> {
    const pokemonRegions: Prisma.PokemonRegionCreateManyInput[] = [];
    for (let index = 0; index < regions.length; index++) {
      const data = await this._getLocationAreaByName(regions[index].local);
      if (!data) continue;

      for (
        let encounterIndex = 0;
        encounterIndex < data.pokemon_encounters.length;
        encounterIndex++
      ) {
        let pokemonName = data.pokemon_encounters[encounterIndex].pokemon.name;
        const pokemon = await this.pokemonRepository.getPokemonByName(
          pokemonName
        );

        if (!pokemon) continue;

        pokemonRegions.push({
          localName: regions[index].local,
          pokemonName: pokemonName,
          chance:
            data.pokemon_encounters[encounterIndex].version_details[0]
              .encounter_details[0].chance,
        });
      }
    }

    return pokemonRegions;
  }

  private async _getLocationAreaByName(
    locationAreaName: string
  ): Promise<IPokemonLocationAreaResponseData | null> {
    try {
      const response = await api.get(
        `/location-area/${locationAreaName + "-area"}`
      );
      return response.data;
    } catch (err: any) {
        if (err.response.status === 404) {
          console.log(`${locationAreaName + "-area"} not found`);
        }
    }

    return null;
  }
}
