import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import Card from '../../components/Card';
import { useEffect, useState } from 'react';
import { IPokemonData, PokemonImages, pokemons } from '../../services/pokedex.service';
import './styles.scss';
import '../styles.scss';

function Pokedex() {
  const [allPokemons, setAllPokemons] = useState<IPokemonData[]>([]);

  useEffect(() => {
    async function getAllPokemons(): Promise<void> {
      try {
        const { data } = await pokemons();

        if (data.success) {
          console.log(data.success);
          setAllPokemons(data.success.pokemons);
          return;
        }

        return;
      } catch (err) {
        console.log(err);
      }
    }

    getAllPokemons();
  }, []);

  function handlePokemonImages(
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

  return (
    <>
      <Menu />
      <div className="container">
        <div className="container-wrapper">
          <div className="container__title">
            <img
              src={require('../../assets/pikachu.png')}
              alt="pikachu"
            />
            <span>Pokedex</span>
          </div>
          <div className="container__search">
            <FaSearch />
            <input
              className="container__search__bar"
              placeholder="Search by name or type..."
            />
            <div className="container__search__filter">
              <BsFilter />
            </div>
          </div>
          <div className="container__filter-box"></div>
        </div>
        <div className="container__pokedex">
          {allPokemons.map((pokemon, key) => {
            return (
              <Card
                key={key}
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.type}
                image={handlePokemonImages(pokemon.id, pokemon.image)}
              />
            )
          })}

        </div>
      </div>
    </>
  );
}

export default Pokedex;
