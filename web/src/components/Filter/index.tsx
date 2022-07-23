import React, { useEffect, useState } from 'react';
import { filterPokemonByType, IPokemonData, pokemonTypes } from '../../services/pokedex.service';
import './styles.scss';
import { arraySort } from '../../hooks/useArraySort';

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
  let filteredPokemonData: IPokemonData[] = [];
  const [ filterType, setFilterType ] = useState<string>('');
  const [ types, setTypes ] = useState<string[]>([]);
  const [ filteredState, setFilteredState ] = useState<IFilterState>({} as IFilterState);
  
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
              <>
              {
                filterType == type ?
                <button key={key} className="type-button black" onClick={() => setFilterType(type)}>{type}</button> :
                <button key={key} className="type-button" onClick={() => setFilterType(type)}>{type}</button>
              }
              </>
            )
          })}
        </div>
      </div>
      <div className="filter-container__stats">
        <span>Stats</span>
        <div className="filter-container__stats__row">
          {
            filteredState.orderBy == 'baseHp' ?
            <div className="type-button black" onClick={() => setFilteredState({orderBy: 'baseHp'})}>hp</div> :
            <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseHp'})}>hp</div>
          }
          {
            filteredState.orderBy == 'baseAttack' ?
            <div className="type-button black" onClick={() => setFilteredState({orderBy: 'baseAttack'})}>attack</div> :
            <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseAttack'})}>attack</div>
          }
          {
            filteredState.orderBy == 'baseSpecialAttack' ?
            <div className="type-button black" onClick={() => setFilteredState({orderBy: 'baseSpecialAttack'})}>special attack</div> :
            <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseSpecialAttack'})}>special attack</div>
          }
          {
            filteredState.orderBy == 'baseDefense' ?
            <div className="type-button black" onClick={() => setFilteredState({orderBy: 'baseDefense'})}>defense</div> :
            <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseDefense'})}>defense</div> 
          }
          {
            filteredState.orderBy == 'baseSpecialDefense' ?
            <div className="type-button black" onClick={() => setFilteredState({orderBy: 'baseSpecialDefense'})}>special defense</div> :
            <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseSpecialDefense'})}>special defense</div> 
          }
          {
            filteredState.orderBy == 'baseSpeed' ?
            <div className="type-button black" onClick={() => setFilteredState({orderBy: 'baseSpeed'})}>speed</div> :
            <div className="type-button" onClick={() => setFilteredState({orderBy: 'baseSpeed'})}>speed</div> 
          }
        </div>
      </div>
      <div className="filter-container__button">
        <button onClick={() => handleApply()}>Apply</button>
      </div>
    </div>
  );
}

export default Filter;