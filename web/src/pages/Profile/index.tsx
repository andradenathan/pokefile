import React from 'react';
import Menu from '../../components/Menu';
import { FaCopy } from 'react-icons/fa';
import './styles.scss';
import '../styles.scss';

function Profile() {
  return (
    <>
      <Menu/>
      <div className="profile-container">
        <div className="profile-container__user">
          <div className="profile-container__user__img">
            <img             
              src={require('../../assets/cap.png')}
              className="profile-container__image"
              alt="cap"
            />
          </div>
          <div className="profile-container__user__infos">
            <div className="profile-container__user__infos__username">
              <span className="profile-container__user__infos__username__name">Milton</span>
              <div className="profile-container__user__infos__username__usercode">
                <span className="profile-container__user__infos__username__usercode--code">424243</span>
                <div className="profile-container__user__infos__username__usercode--icon">
                  <FaCopy/>
                </div>
              </div>
            </div>
            <span className="profile-container__user__infos__userdesc">
            Uma descrição.
            </span>
          </div>
        </div>
        <div className="divider"/>
        <div className="profile-container__pokemons">
          <div className="profile-container__pokemons__item">
            <div className="profile-container__pokemons__item--label">favorite</div>
            <div className="profile-container__pokemons__item--img"></div>
          </div>
          <div className="profile-container__pokemons__item">
            <div className="profile-container__pokemons__item--label">team</div>
            <div className="profile-container__pokemons__item__team">
              <div className="profile-container__pokemons__item__team--pokemon"></div>
              <div className="profile-container__pokemons__item__team--pokemon"></div>
              <div className="profile-container__pokemons__item__team--pokemon"></div>
              <div className="profile-container__pokemons__item__team--pokemon"></div>
              <div className="profile-container__pokemons__item__team--pokemon"></div>
              <div className="profile-container__pokemons__item__team--pokemon"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
