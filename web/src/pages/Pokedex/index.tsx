import { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import Card from '../../components/Card';
import Pokemon from '../../components/Pokemon';
import { IPokemonData, pokemons, searchByName } from '../../services/pokedex.service';
import Filter from '../../components/Filter';
import { FaSearch } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import './styles.scss';
import '../styles.scss';
import { handlePokemonImages } from '../../hooks/usePokemonImage';
import { useAuth } from '../../hooks/useAuth';

function Pokedex() {
  const [ allPokemons, setAllPokemons ] = useState<IPokemonData[]>([]);
  const [search, setSearch] = useState<IPokemonData[]>([]);
  const [pokemon, setPokemon] = useState<IPokemonData>({} as IPokemonData);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ filterOpen, setFilterOpen ] = useState(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [ id, setId ] = useState(Number);
  
  const { code } = useAuth();
  

  const handleSearch = async(pokemonName: string) => {
    if(isFiltered) return;  

    if(pokemonName.length === 0) setSearch([]);

    const response = await searchByName(pokemonName);
    if(!response.data.success || response.data.success.pokemons.length == 0) return;
    setSearch(response.data.success?.pokemons);
  }
  
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
        <Pokemon pokemon={pokemon} isOpen={isOpen} setIsOpen={setIsOpen} />
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

              onChange={(event) => {
                handleSearch(event.target.value);
              }}
              placeholder="Search by name..."
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
            <Filter 
              pokemons={allPokemons}
              filterOpen={filterOpen} 
              setSearch={setSearch} 
              setFilterOpen={setFilterOpen} 
              setIsFiltered={setIsFiltered}
              setIsOrdered={setIsOrdered}
            />
          }
        </div> 

        {search.length > 0 && (isFiltered || isOrdered) &&
          <button 
            onClick={() => {
              setSearch([]);
              setIsFiltered(false);
            }}>Limpar filtro
          </button>
        }

        <div className="container__pokedex">
          {search.length > 0 ? 
          search.map((pokemon) => {
            return (
              <Card
                key={pokemon.id}
                pokemon={pokemon}
                image={handlePokemonImages(pokemon.id, pokemon.image)}
                setId={setId}
                setIsOpen={setIsOpen}
                setPokemon={setPokemon}
              />
            )
          }) :
           allPokemons.map((pokemon) => {
            return (
              <Card
                key={pokemon.id}
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
