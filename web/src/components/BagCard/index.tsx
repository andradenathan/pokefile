import React, { useState } from 'react';
import { TbPokeball, TbTrash, TbHeart } from 'react-icons/tb';
import './styles.scss';
import './../../pages/styles.scss';

function BagCard() {

  const [ openEdit, setOpenEdit ] = useState(false);

  return (
    <>
    {
      openEdit ? 
      <div className="bagcard-container bag-edit">
        <div className="bag-edit__delete" onClick={() => {setOpenEdit(false)}}>x</div>
        <div className="bag-edit__options">
          <span><TbHeart className="edit-icon"/>Favorite</span>
          <span><TbPokeball className="edit-icon"/>Team Add</span>
          <span><TbTrash className="edit-icon"/>Remove</span>
        </div>
      </div>
      :
      <div className="bagcard-container" onClick={() => {setOpenEdit(true)}}>
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
    }
    </>
  );
}

export default BagCard;
