import { PokemonImages } from "../services/pokedex.service";

export function handlePokemonImages(
    pokemonId: number,
    pokemonImages: Array<PokemonImages>,
    pokemonShiny: boolean,
  ): string {
    let savedImage: string = '';
    pokemonImages.forEach((image) => {
      if (image.path.includes('back')) return;
      if (pokemonShiny && image.path.includes(`/sprites/pokemon/shiny/${pokemonId}.png`))
        savedImage = image.path; 
      if (image.path.includes(`/sprites/pokemon/${pokemonId}.png`))
        savedImage = image.path;
    });
    return savedImage;
}