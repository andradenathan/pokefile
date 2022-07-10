import { PokemonImages } from "../services/pokedex.service";

export function handlePokemonImages(
    pokemonId: number,
    pokemonImages: Array<PokemonImages>
  ): string {
    let savedImage: string = '';
    pokemonImages.forEach((image) => {
      if (image.path.includes('back') || image.path.includes('shiny')) return;

      if (image.path.includes(`/sprites/pokemon/${pokemonId}.png`))
        savedImage = image.path;
    });
    return savedImage;
}