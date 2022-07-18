import React, { useState } from 'react';
import { filterPokemonByType, IPokemonData } from '../../services/pokedex.service';
import './styles.scss';

interface IFilterProps {
  filterOpen: boolean;
  pokemons: IPokemonData[];
  setSearch: React.Dispatch<React.SetStateAction<IPokemonData[]>>;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFilterTypeData {
  success: {
    pokemons: {
      name: string;
      pokemonName: string;
      id: number;
    }
  }
}

function Filter(props: IFilterProps) {
  const [filterValue, setFilterValue] = useState<string | number>('');
  const filteredPokemonData: IPokemonData[] = [];

  async function handleApply() {
    const { data } = await filterPokemonByType(filterValue as string);
    if (!data.success) { return; }
    
    props.pokemons.forEach((pokemon) => {
      data.success?.pokemons.forEach((filteredPokemon) => {
        if (pokemon.name == filteredPokemon.pokemonName) {
          filteredPokemonData.push(pokemon);
        }
      });
    });

    props.setSearch(filteredPokemonData);
    props.setIsFiltered(true);
    props.setFilterOpen(false);
  }

  return(
    <div className="filter-container">
      <div className="filter-container__types">
        <span>Types</span>
        <div className="filter-container__types__row">
          <div className="type-button" onClick={() => setFilterValue('grass')}>grass</div>
          <div className="type-button" onClick={() => setFilterValue('poison')}>poison</div>
          <div className="type-button" onClick={() => setFilterValue('fire')}>fire</div>
          <div className="type-button" onClick={() => setFilterValue('flying')}>flying</div>
          <div className="type-button" onClick={() => setFilterValue('water')}>water</div>
          <div className="type-button" onClick={() => setFilterValue('bug')}>bug</div>
          <div className="type-button" onClick={() => setFilterValue('electric')}>electric</div>
          <div className="type-button" onClick={() => setFilterValue('ground')}>ground</div>
          <div className="type-button" onClick={() => setFilterValue('fairy')}>fairy</div>
          <div className="type-button" onClick={() => setFilterValue('fighting')}>fighting</div>
          <div className="type-button" onClick={() => setFilterValue('psychic')}>psychic</div>
          <div className="type-button" onClick={() => setFilterValue('rock')}>rock</div>
          <div className="type-button" onClick={() => setFilterValue('steel')}>steel</div>
          <div className="type-button" onClick={() => setFilterValue('ice')}>ice</div>
          <div className="type-button" onClick={() => setFilterValue('ghost')}>ghost</div>
          <div className="type-button" onClick={() => setFilterValue('dragon')}>dragon</div>
          <div className="type-button" onClick={() => setFilterValue('normal')}>normal</div>
        </div>
      </div>
      <div className="filter-container__stats">
        <span>Stats</span>
        <div className="filter-container__stats__row">
          <div className="type-button">hp</div>
          <div className="type-button">atk</div>
          <div className="type-button">s. atk</div>
          <div className="type-button">def</div> 
          <div className="type-button">s. def</div> 
          <div className="type-button">speed</div> 
        </div>
      </div>
      <div className="filter-container__button">
        <button onClick={() => { handleApply(); }}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default Filter;