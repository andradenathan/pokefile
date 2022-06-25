import React from 'react';
import Types from '../Types';
import './styles.scss';
import './../../pages/styles.scss';

function Card() {
  return (
    <>
      <div className="card-container">
        <div className="card-container__add">+</div>
        <div className="card-container__img">
          <img 
            src={require('../../assets/pikachu.png')}
            className="card-container__image"
            alt="pokemon"
          />
        </div>
        <div className="card-container__number">N°001</div>
        <div className="card-container__name">Bulbasaur</div>
        <div className="type-wrapper">
          <Types type={'grass'}/>
          <Types type={'poison'}/>
        </div>
      </div>
    </>
  );
}

export default Card;
