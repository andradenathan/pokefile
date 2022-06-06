import React from 'react';
import Menu from '../../components/Menu';
import './styles.scss';

function Home() {
  return (
    <>
      <Menu/>
      <div className="home-container">
        <div className="home-container__logo">
          Pokefile
        </div>
        <div className="home-container__description">
          Veja todas as informações sobre a primeira geração, 
          registre seus Pokemons e compartilhe seu time com amigos!
        </div>
        <div className="home-container__pikachu"></div>
      </div>
    </>
  );
}

export default Home;
