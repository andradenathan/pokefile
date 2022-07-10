import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import Card from '../../components/Card';
import Pokemon from '../../components/Pokemon';
import { useEffect, useState } from 'react';
import { IPokemonData, pokemons } from '../../services/pokedex.service';
import './styles.scss';
import '../styles.scss';
import { handlePokemonImages } from '../../hooks/usePokemonImage';

function Pokedex() {
  const [ allPokemons, setAllPokemons ] = useState<IPokemonData[]>([]);
  const [pokemon, setPokemon] = useState<IPokemonData>({} as IPokemonData);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ id, setId ] = useState(Number);

  useEffect(() => {
    async function getAllPokemons(): Promise<void> {
      try {
        const { data } = await pokemons();

        if (data.success) {
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

  return (
    <>
      <Menu />
      {
        isOpen &&
        <Pokemon pokemon={pokemon} id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
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
            <div className="container__search__filter">
              <BsFilter />
            </div>
          </div>
          <div className="container__filter-box"></div>
        </div>
        <div className="container__pokedex">
          {allPokemons.length > 0 && allPokemons.map((pokemon, key) => {
            return (
              <Card
                key={key}
                pokemon={pokemon}
                image={handlePokemonImages(pokemon.id, pokemon.image)}
                setId={setId}
                setIsOpen={setIsOpen}
                setPokemon={setPokemon}
              />
            )
          })}
        </div>
      </div>
    </>
  );
}

export default Pokedex;
