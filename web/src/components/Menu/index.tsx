import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import { AuthContext } from '../../contexts/Auth';
import './styles.scss';

function Menu() {

  const auth = useContext(AuthContext);
  const [ path, setPath ] = useState("");

  useEffect(() => {
    auth.signed ? setPath("/profile") : setPath("/login");
  }, [auth])
  
  return (
    <div className="menu">
      <div className="menu__container">
        <a className="menu__container__logo">
          <Link to="/">Pokefile</Link>
        </a>
        <ul className="menu__container__buttons">
          <li className="menu__container__buttons__pokedex">
            <Link to="/pokedex">pokedex</Link>
          </li>
          <li className="menu__container__buttons__trainers">
            <Link to="/trainers">trainers</Link>
          </li>
          <li className="menu__container__buttons__bag">
            <Link to="/bag">my bag</Link>
          </li>
          <li className="menu__container__buttons__profile">
            <Link to={path}>
              <FaUser/>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
