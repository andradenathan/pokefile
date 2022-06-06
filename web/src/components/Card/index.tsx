import React from 'react';
import './styles.scss';

function Card() {
  return (
    <>
      <div className="card-container">
        <div className="card-container__img">
          <img 
            src={require('../../assets/pikachu.png')}
            className="card-container__image"
            alt="pokemon"
          />
        </div>
        <div className="card-container__number">N°001</div>
        <div className="card-container__name">Bulbasauro</div>
        <div className="card-container__add">+</div>
      </div>
    </>
  );
}

export default Card;
