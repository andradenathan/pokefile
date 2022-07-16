import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut, BiUser } from 'react-icons/bi';
import { AuthContext } from '../../contexts/Auth';
import './styles.scss';

interface IPopProps {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>; 
}

function MenuPopup(props: IPopProps) {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    auth.setToken("");
    auth.setCode(0);
    localStorage.removeItem('token');
    localStorage.removeItem('code');

    props.setPopup(false);
    alert("Logged out.")

    navigate('/pokedex');
  }
  
  return (
    <div className="popup">
      <Link className="popup__item" to={`/profile/${auth.code}`}>
        <BiUser/>
        <span>Profile</span>
      </Link>
      <a className="popup__item" onClick={() => { logout(); }}>
        <BiLogOut/>
        <span>Logout</span>
      </a>
    </div>
  );
}

export default MenuPopup;
