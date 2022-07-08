import { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import Card from '../../components/Card';
import Pokemon from '../../components/Pokemon';
import Filter from '../../components/Filter';
import { IPokemonData, PokemonImages, pokemons } from '../../services/pokedex.service';
import { FaSearch } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import './styles.scss';
import '../styles.scss';

function Pokedex() {
  const [ allPokemons, setAllPokemons ] = useState<IPokemonData[]>([]);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ filterOpen, setFilterOpen ] = useState(false);
  const [ id, setId ] = useState(Number);

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
      {
        isOpen &&
        <Pokemon id={id} isOpen={isOpen} setIsOpen={setIsOpen}/>
      }
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
            {
              filterOpen ?
              <div 
                className="container__search__filter black"
                onClick={() => { setFilterOpen(false) }}
              >
                <BsFilter />
              </div> :
                <div 
                className="container__search__filter white"
                onClick={() => { setFilterOpen(true) }}
                >
                <BsFilter />
              </div>
            }
          </div>
          {
            filterOpen &&
            <Filter filterOpen={filterOpen} setFilterOpen={setFilterOpen}/>
          }
        </div>
        <div className="container__pokedex">
          {allPokemons.length > 0 && allPokemons.map((pokemon, key) => {
            return (
              <Card
                key={key}
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.type}
                image={handlePokemonImages(pokemon.id, pokemon.image)}
                setId={setId}
                setIsOpen={setIsOpen}
              />
            )
          })}
        </div>
      </div>
    </>
  );
}

export default Pokedex;
