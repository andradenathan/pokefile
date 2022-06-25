import React from 'react';
import './styles.scss';
import './../../pages/styles.scss';

function BagCard() {
  return (
    <>
      <div className="bagcard-container">
        <div className="bagcard-container__delete">x</div>
        <div className="bagcard-container__level">LvL 99</div>
        <div className="bagcard-container__img">
          <img 
            src={require('../../assets/pikachu.png')}
            className="bagcard-container__image"
            alt="pokemon"
          />
        </div>
        <div className="bagcard-container__details">
          <div className="bagcard-container__details__list">
            <div className="bagcard-container__details__list__item">a</div>
            <div className="bagcard-container__details__list__item">b</div>
          </div>
          <div className="bagcard-container__details__list">
            <div className="bagcard-container__details__list__item">c</div>
            <div className="bagcard-container__details__list__item">d</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BagCard;
