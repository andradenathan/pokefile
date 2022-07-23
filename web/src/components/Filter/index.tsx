import React, { useEffect, useState } from 'react';
import { filterPokemonByType, IPokemonData, pokemonTypes } from '../../services/pokedex.service';
import './styles.scss';
import {arraySort} from '../../hooks/useArraySort';

interface IFilterProps {
  filterOpen: boolean;
  pokemons: IPokemonData[];
  setSearch: React.Dispatch<React.SetStateAction<IPokemonData[]>>;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOrdered: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFilterState {
  orderBy: string;
  orderDirection?: string;
}

function Filter(props: IFilterProps) {
  const [filterType, setFilterType] = useState<string>('');
  let filteredPokemonData: IPokemonData[] = [];
  const [types, setTypes] = useState<string[]>([]);
  const [filteredState, setFilteredState] = useState<IFilterState>({} as IFilterState);
  
  useEffect(() => {
    (async () => {
      const { data } = await pokemonTypes();
      if(!data.success) return;

      setTypes(data.success.types.map(type => type.name));
    })();
  }, []);
  console.log(filteredState, filterType);
  async function handleApply() {
    if(!filterType) {
      filteredPokemonData = [...props.pokemons];
      arraySort(filteredPokemonData, filteredState.orderBy, filteredState.orderDirection);
    }

    else {
      const { data } = await filterPokemonByType(filterType);
      if (!data.success) return;

      props.pokemons.forEach((pokemon) => {
        data.success?.pokemons.forEach((filteredPokemon) => {
          if (pokemon.name === filteredPokemon.pokemonName) {
            filteredPokemonData.push(pokemon);
          }
        });
      });

      arraySort(
        filteredPokemonData, 
        filteredState.orderBy, 
        filteredState.orderDirection
      );
    }  

    props.setSearch(filteredPokemonData);
    props.setIsOrdered(true);
    props.setIsFiltered(true);
    props.setFilterOpen(false);
  }

  return(
    <div className="filter-container">
      <div className="filter-container__types">
        <span>Types</span>
        <div className="filter-container__types__row">
          {types.map((type, key) => {
            return (
              <div key={key} className="type-button" onClick={() => setFilterType(type)}>{type}</div>
            )
          })}
        </div>
      </div>
      <div className="filter-container__stats">
        <span>Stats</span>
        <div className="filter-container__stats__row">
          <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseHp'})}>hp</div>
          <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseAttack'})}>atk</div>
          <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseSpecialAttack'})}>s. atk</div>
          <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseDefense'})}>def</div> 
          <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseSpecialDefense'})}>s. def</div> 
          <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseSpeed'})}>speed</div> 
        </div>
      </div>
      <div className="filter-container__button">
        <button onClick={() => handleApply()}>Apply</button>
      </div>
    </div>
  );
}

export default Filter;