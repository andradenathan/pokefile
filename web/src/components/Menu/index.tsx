import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import MenuPopup from './MenuPopup';
import './styles.scss';
import { useAuth } from '../../hooks/useAuth';

function Menu() {
  const auth = useAuth();
  const [ popup, setPopup ] = useState(false);

  return (
    <div className="menu">
      <div className="menu__container">
        { popup && <MenuPopup popup={popup} setPopup={setPopup}/> }
        <a className="menu__container__logo">
          <Link to="/">Pokefile</Link>
        </a>
        <ul className="menu__container__buttons">
          <li className="menu__container__buttons__pokedex">
            <Link to="/pokedex">pokédex</Link>
          </li>
          <li className="menu__container__buttons__trainers">
            <Link to="/trainers">trainers</Link>
          </li>
          {auth.token && (<li className="menu__container__buttons__bag">
            <Link to="/bag">my bag</Link>
          </li>)}
          <li className="menu__container__buttons__profile">
            {
              auth.token ?
              <a><FaUser onClick={() => { setPopup(!popup) }}/></a> :
              <Link to="/login">
                <FaUser/>
              </Link>
            }
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
