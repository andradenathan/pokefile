import React, { useEffect, useState } from 'react';
import IdAdjust from '../../utils/IdAdjust';
import './styles.scss';
import './../../pages/styles.scss';

interface IPokemonProps {
  id: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Pokemon(props: IPokemonProps) {
  
  const [ newId, setNewId ] = useState('');

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
            <div className="pokemon-container__left__extra__gender">M F</div>
            <div className="pokemon-container__left__extra__shiny">S</div>
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
          <div className="pokemon-container__right__type"></div>
          <div className="pokemon-container__right__type"></div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
