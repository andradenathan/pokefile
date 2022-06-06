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
          Feel free to search for all Pokemon's information about their <span>First Generation</span>. 
          Register your own Pokemons and share your team with your friends!
        </span>
        <div className="home-container__pikachu">
          <img 
            src={require('../../assets/home-pikachu.gif')}
            alt="pikachu"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
