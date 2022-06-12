import React from 'react';
import Menu from '../../components/Menu';
import './styles.scss';
import '../styles.scss';

function Bag() {
  return (
    <>
      <Menu/>
      <div className="container">
        <div className="container__title">
          <img 
            src={require('../../assets/backpack.png')}
            alt="bag"
          />
          <span>Bag</span>
        </div>
      </div>
    </>
  );
}

export default Bag;
