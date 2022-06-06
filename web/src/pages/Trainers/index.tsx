import React from 'react';
import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import TrainerCard from '../../components/TrainerCard';
import './styles.scss';
import '../styles.scss';

function Trainers() {
  return (
    <>
      <Menu/>
      <div className="container">
        <div className="container__title">
          <img 
            src={require('../../assets/cap.png')}
            alt="cap"  
          />
          <span>Treinadores</span>
        </div>
        <div className="container__search">
          <FaSearch/>
          <input 
            className="container__search__bar"
            placeholder="Procure por nome ou ID de usuário..."
          />
        </div>
        <div className="container__trainers">
          <TrainerCard/>
          <TrainerCard/>
          <TrainerCard/>
          <TrainerCard/>
          <TrainerCard/>
        </div>
      </div>
    </>
  );
}

export default Trainers;
