import React from 'react';
import Menu from '../../components/Menu';
import './styles.scss';

function Home() {
  return (
    <>
      <Menu/>
      <div className="home-container">
        <h1 className="home-container__logo">
          Pokefile
        </h1>
        <span className="home-container__description">
          Veja todas as informações sobre a <span>Primeira Geração</span> de Pokemon, 
          registre os seus próprios e compartilhe seu time com amigos!
        </span>
        <div className="home-container__pikachu">
          <img src={require('../../assets/home-pikachu.gif')}/>
        </div>
      </div>
    </>
  );
}

export default Home;
