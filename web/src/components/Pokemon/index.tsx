import React, { useEffect, useState } from 'react';
import IdAdjust from '../../utils/IdAdjust';
import Types from '../Types';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { BsStars } from 'react-icons/bs';
import './styles.scss';
import './../../pages/styles.scss';
import { IPokemonData } from '../../services/pokedex.service';
import { handlePokemonImages } from '../../hooks/usePokemonImage';


interface IPokemonProps {
  pokemon: IPokemonData;
  id: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Pokemon(props: IPokemonProps) {

  console.log(props.pokemon.pokemon) 
  
  const [ newId, setNewId ] = useState('');
  const [ selectedGender, setSelectedGender ] = useState(false);
  const [ selectedShiny, setSelectedShiny ] = useState(false);

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
            <div className="pokemon-container__left__extra__gender">
              {
                selectedGender ?
                <>
                  <IoMdMale color="#808080" onClick={() => {setSelectedGender(false)}}/>
                  <IoMdFemale color="#151515"/>
                </> :
                <>
                  <IoMdMale color="#151515"/>
                  <IoMdFemale color="#808080" onClick={() => {setSelectedGender(true)}}/>
                </>
              }
            </div>
            <div className="pokemon-container__left__extra__shiny">
              {
                selectedShiny ?
                <>
                  <BsStars color="#151515" onClick={() => {setSelectedShiny(false)}}/>
                </> :
                <>
                  <BsStars color="#808080" onClick={() => {setSelectedShiny(true)}}/>
                </>
              }
            </div>
          </div> 
          <div className="pokemon-container__left__evo">
            <span>Evolution</span>
            <div className="pokemon-container__left__evo__container">
              { props.pokemon.pokemon.length > 0 ? 
              <div className="pokemon-container__left__evo__container__img">
                {props.pokemon.pokemon.map((evolution) =>{
                    return (<img 
                    // src={handlePokemonImages(evolution.evolution.id, evolution.evolution.image)}
                    alt="pokemon"
                  />)
                })}
              </div> : 
              <span className="no-evo">This Pokemon does not have an Evolution.</span>
              }
            </div>
          </div> 
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
            <div className="pokemon-container__right__bases__col">
              <span>Weight</span>
              <span>{props.pokemon.weight/10} kg</span>
            </div>
            <div className="pokemon-container__right__bases__col">
              <span>Height</span>
              <span>{props.pokemon.height/10} m</span>
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
          <div className="pokemon-container__right__locations">
            <div className="pokemon-container__right__locations__title">
              <span>Location</span>
              <span>Chance</span>
            </div>
            <div className="pokemon-container__right__locations__areas">
              { props.pokemon.region.map((region) => {
                  {
                    return (
                    <div className="pokemon-container__right__locations__area">
                      <span>{region.localName}</span>
                      <span>{region.chance}%</span>
                    </div> ) 
              }})}
            </div> 
          </div> : null }
          <button 
            className="pokemon-container__add" 
            onClick={() => {console.log("hello!")}}
          >+</button>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
