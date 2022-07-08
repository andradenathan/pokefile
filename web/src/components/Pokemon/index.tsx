import React, { useEffect, useState } from 'react';
import IdAdjust from '../../utils/IdAdjust';
import Types from '../Types';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { BsStars } from 'react-icons/bs';
import './styles.scss';
import './../../pages/styles.scss';

interface IPokemonProps {
  id: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Pokemon(props: IPokemonProps) {
  
  const [ newId, setNewId ] = useState('');
  const [ selectedGender, setSelectedGender ] = useState(false);
  const [ selectedShiny, setSelectedShiny ] = useState(false);

  useEffect(() => {
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
          <span>Bulbasaur</span>
        </div>
        <div className="pokemon-container__left">
          <div className="pokemon-container__left__img">
            <img 
              src={require('../../assets/pikachu.png')}
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
              <div className="pokemon-container__left__evo__container__img">
                <img 
                  src={require('../../assets/pikachu.png')}
                  alt="pokemon"
                />
              </div>
              <div className="pokemon-container__left__evo__container__img">
                <img 
                  src={require('../../assets/pikachu.png')}
                  alt="pokemon"
                />
              </div>
              <div className="pokemon-container__left__evo__container__img">
                <img 
                  src={require('../../assets/pikachu.png')}
                  alt="pokemon"
                />
              </div>
            </div>
          </div> 
        </div>
        <div className="pokemon-container__right">
          <div className="pokemon-container__right__types">
            <span>Type</span>
            <div className="pokemon-container__right__types__row">
              <Types type="poison"/>
              <Types type="grass"/>
            </div>
          </div>
          <div className="pokemon-container__right__bases">
            <div className="pokemon-container__right__bases__col">
              <span>EXP</span>
              <span>64</span>
            </div>
            <div className="pokemon-container__right__bases__col">
              <span>Weight</span>
              <span>64</span>
            </div>
            <div className="pokemon-container__right__bases__col">
              <span>Height</span>
              <span>64</span>
            </div>
          </div>
          <div className="pokemon-container__right__stats">
            <span>Stats</span>
            <div className="pokemon-container__right__stats__items">
               <div className="item">
                 <span>HP</span>
                 <span>50</span>
               </div>
               <div className="item">
                 <span>HP</span>
                 <span>50</span>
               </div>
               <div className="item">
                 <span>HP</span>
                 <span>50</span>
               </div>
               <div className="item">
                 <span>HP</span>
                 <span>50</span>
               </div>
               <div className="item">
                 <span>HP</span>
                 <span>50</span>
               </div>
               <div className="item">
                 <span>HP</span>
                 <span>50</span>
               </div>
            </div>
          </div>
          <div className="pokemon-container__right__locations">
            <span>Location</span>
            <span>Cerulean, lumiose, pallet town</span>
          </div>
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
