import React from 'react';
import Menu from '../../components/Menu';
import BagCard from '../../components/BagCard';
import { FaSearch } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import './styles.scss';
import '../styles.scss';

function Bag() {
  return (
    <>
      <Menu/>
      <div className="container">
        <div className="container-wrapper">
          <div className="container__title">
            <img 
              src={require('../../assets/backpack.png')}
              alt="pikachu"
            />
            <span>Bag</span>
          </div>
          <div className="container__search">
            <FaSearch/>
            <input 
              className="container__search__bar"
              placeholder="Search by name or type..."
            />
            <div className="container__search__filter">
              <BsFilter/>
            </div>
          </div>
          <div className="container__filter-box"></div>
        </div>
        <div className="bag">
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
          <BagCard/>
        </div>
      </div>
    </>
  );
}

export default Bag;
