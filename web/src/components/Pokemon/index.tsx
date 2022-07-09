import React, { useEffect, useState } from 'react';
import IdAdjust from '../../utils/IdAdjust';
import './styles.scss';
import './../../pages/styles.scss';
import Types from '../Types';
import { IPokemonData, PokemonImages } from '../../services/pokedex.service';


interface IPokemonProps {
  pokemon: IPokemonData;
  id: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Pokemon(props: IPokemonProps) {
  
  const [ newId, setNewId ] = useState('');

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


  useEffect(() => {
    console.log(props.pokemon);
    IdAdjust({ id: props.id, setNewId: setNewId });
  }, [])

  return (
    <div className="modal-black-bg">
      <div className="pokemon-container">
        <button 
          className="pokemon-container__close" 
          onClick={() => {props.setIsOpen(false)}}
        >X</button>
        <div className="pokemon-container__name">
          <span>#{newId}</span>
          <span>{props.pokemon.name}</span>
        </div>
        <div className="pokemon-container__left">
          <div className="pokemon-container__left__img">
            <img 
              src={handlePokemonImages(props.pokemon.id, props.pokemon.image)}
              alt="pokemon"
            />
          </div>
          <div className="pokemon-container__left__extra">
            <div className="pokemon-container__left__extra__gender">M F</div>
            <div className="pokemon-container__left__extra__shiny">S</div>
          </div> 
              {props.pokemon.pokemon.length > 0 ? 
              <div className="pokemon-container__left__evo">
              <span>Evolution</span>
              <div className="pokemon-container__left__evo__container">
                <div className="pokemon-container__left__evo__container__img">
                  {props.pokemon.pokemon.map((evolution) =>{
                      return (<img 
                      src={handlePokemonImages(evolution.evolution.id, evolution.evolution.image)}
                      alt="pokemon"
                    />)
                  })}
                </div>
              </div>
            </div> 
          : null
        }
        </div>
          
        <div className="pokemon-container__right">
          <div className="pokemon-container__right__types">
            <span>Type</span>
            <div className="pokemon-container__right__types__row">
            {props.pokemon.type.map((type) => {
              return (
                <Types type={type.name} />
              )
            })}
            </div>
          </div>
          <div className="pokemon-container__right__bases">
            {/* <div className="pokemon-container__right__bases__col">
              <span>EXP</span>
              <span>64</span>
            </div> */}
            <div className="pokemon-container__right__bases__col">
              <span>Weight</span>
              <span>{props.pokemon.weight}</span>
            </div>
            <div className="pokemon-container__right__bases__col">
              <span>Height</span>
              <span>{props.pokemon.height}</span>
            </div>
          </div>
          <div className="pokemon-container__right__stats">
            <span>Stats</span>
            <div className="pokemon-container__right__stats__items">
               <div className="item">
                 <span>BASE ATK</span>
                 <span>{props.pokemon.baseAttack}</span>
               </div>
               <div className="item">
                 <span>BASE DEF</span>
                 <span>{props.pokemon.baseDefense}</span>
               </div>
               <div className="item">
                 <span>BASE HP</span>
                 <span>{props.pokemon.baseHp}</span>
               </div>
               <div className="item">
                 <span>BASE SPEED</span>
                 <span>{props.pokemon.baseSpeed}</span>
               </div>
               <div className="item">
                 <span>BASE SPECIAL ATK</span>
                 <span>{props.pokemon.baseSpecialAttack}</span>
               </div>
               <div className="item">
                 <span>BASE SPECIAL DEF</span>
                 <span>{props.pokemon.baseSpecialDefense}</span>
               </div>
            </div>
          </div>
          {props.pokemon.region.length > 0 ? 
            <div className="pokemon-container__right__bases">
            <div className="pokemon-container__right__bases__col">
              <span>Local</span>
              {
                props.pokemon.region.map((region) => {
                  return (
                    <span>{region.localName}</span>
                  )
                })}
                </div>
                <div className="pokemon-container__right__bases__col">
                  <span>Chance</span>
                  {props.pokemon.region.map((region) => {
                    return (
                      <span>{region.chance}</span>
                    )
                  })}
                </div>
              </div>
              :
              null
          }
        </div>
        <button 
          className="pokemon-container__add" 
          onClick={() => {console.log("hello!")}}
        >+</button>
      </div>
    </div>
  );
}

export default Pokemon;
