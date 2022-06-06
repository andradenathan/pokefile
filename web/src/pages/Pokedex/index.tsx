import React from 'react';
import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import Card from '../../components/Card';
import './styles.scss';
import '../styles.scss';

function Pokedex() {
  return (
    <>
      <Menu/>
      <div className="container">
        <div className="container__title">
          <img src={require('../../assets/pikachu.png')}/>
          <span>Pokedex</span>
        </div>
        <div className="container__search">
          <FaSearch/>
          <input 
            className="container__search__bar"
            placeholder="Pesquise por nome ou tipo..."
          />
          <div className="container__search__filter">
            <BsFilter/>
          </div>
        </div>
        <div className="container__filter-box"></div>
        <div className="container__pokedex">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </>
  );
}

export default Pokedex;
