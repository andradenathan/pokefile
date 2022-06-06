import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';

function Menu() {
  return (
    <div className="menu">
      <div className="menu__container">
        <a className="menu__container__logo">
          <Link to="/">Pokefile</Link>
        </a>
        <ul className="menu__container__buttons">
          <li className="menu__container__buttons__pokedex">pokedex</li>
          <li className="menu__container__buttons__trainers">treinadores</li>
          <li className="menu__container__buttons__bag">mochila</li>
          <li className="menu__container__buttons__profile">perfil</li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
