import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";
import { PokemonEvolutionService } from "./pokemon-evolution/pokemon-evolution.service";
import { PokemonRegionService } from "./pokemon-region/pokemon-region.service";
import { PokemonRepository } from "./pokemon.repository";
import PokemonService from "./pokemon.service";

@controller("/pokemons")
export default class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly pokemonEvoService: PokemonEvolutionService,
    private readonly pokemonRegionService: PokemonRegionService,
    private readonly pokemonRepository: PokemonRepository
  ) {}

  @httpGet("/")
  async all(request: Request, response: Response): Promise<Response> {
    try {
      const pokemons = await this.pokemonRepository.all();
      return response.status(200).json({ success: { pokemons: pokemons } });
    } catch (err: any) {
      return response.status(422).json({ error: { message: err.message } });
    }
  }

  @httpGet("/search/type/:value")
  async searchByType(request: Request, response: Response): Promise<Response> {
    const value = request.params.value;

    try {
      const pokemons = await this.pokemonRepository.search(value, "type");
      return response.status(200).json({ success: { pokemons: pokemons } });
    } catch (err: any) {
      return response.status(422).json({ error: { message: err.message } });
    }
  }

  @httpGet("/search/region/:value")
  async searchByRegion(
    request: Request,
    response: Response
  ): Promise<Response> {
    const value = request.params.value;

    try {
      const pokemons = await this.pokemonRepository.search(value, "region");
      return response.status(200).json({ success: { pokemons: pokemons } });
    } catch (err: any) {
      return response.status(422).json({ error: { message: err.message } });
    }
  }

  @httpGet("/populate")
  async populate(request: Request, response: Response): Promise<Response> {
    try {
      const pokemons = await this.pokemonService.execute();
      return response.status(200).json({ success: { pokemons: pokemons } });
    } catch (err: any) {
      return response.status(422).json({ error: { message: err.message } });
    }
  }

  @httpGet("/populate/evolutions")
  async populateEvolutions(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const evolutions = await this.pokemonEvoService.execute();
      return response
        .status(200)
        .json({ success: { pokemon_evolutions: evolutions } });
    } catch (err: any) {
      return response.status(422).json({ error: { message: err.message } });
    }
  }

  @httpGet("/populate/regions")
  async populateRegions(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const regions = await this.pokemonRegionService.execute();
      return response
        .status(200)
        .json({ success: { pokemon_regions: regions } });
    } catch (err: any) {
      return response.status(422).json({ error: { message: err.message } });
    }
  }
}
