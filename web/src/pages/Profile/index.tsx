import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { IAuthenticatedTrainer, me } from '../../services/auth.service';
import { FaCopy } from 'react-icons/fa';
import './styles.scss';
import '../styles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrainer, ICodeData } from '../../services/trainer.service';

function Profile() {

  const params = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<IAuthenticatedTrainer>({} as IAuthenticatedTrainer);

  async function handleGetTrainer(codeData: ICodeData) {
    const response = await getTrainer(codeData);
    if(response.data.success) {
      //@ts-ignore
      setTrainer(response.data.success.user);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        !params.code ? navigate("/login") : handleGetTrainer({code: params.code});
      } catch(err) { return err; }
    })();

  }, [params.code]);

  return (

    <>
      <Menu/>
      <div className="profile-container">
        <div className="profile-container__user">
          <div className="profile-container__user__img">
            <img             
              src={trainer.avatar}
              className="profile-container__image"
              alt="cap"
            />
          </div>
          <div className="profile-container__user__infos">
            <div className="profile-container__user__infos__username">
              <span className="profile-container__user__infos__username__name">{trainer.name}</span>
              <div className="profile-container__user__infos__username__usercode">
                <span className="profile-container__user__infos__username__usercode--code">{trainer.code}</span>
                <div className="profile-container__user__infos__username__usercode--icon">
                  <FaCopy/>
                </div>
              </div>
            </div>
            <div className="profile-container__user__infos__userdesc">
              {/* <p>user statistics</p> */}
              <div className="profile-container__user__infos__userdesc__items">
                <div className="profile-container__user__infos__userdesc__items--item">
                  <p>Collection</p>
                  <span>398</span>
                </div>
                <div className="profile-container__user__infos__userdesc__items--item">
                  <p>Pokédex</p>
                  <span>15/151</span>
                </div>
                <div className="profile-container__user__infos__userdesc__items--item">
                  <p>Favorite Type</p>
                  <span>Fairy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"/>
        <div className="profile-container__pokemons">
          <div className="profile-container__pokemons__item">
            <div className="profile-container__pokemons__item--label">favorite</div>
            <div className="profile-container__pokemons__item--img">
              <img src={require('../../assets/pikachu.png')} alt="pokemon" />
            </div>
          </div>
          <div className="profile-container__pokemons__item">
            <div className="profile-container__pokemons__item--label">team</div>
            <div className="profile-container__pokemons__item__team">
              <div className="profile-container__pokemons__item__team--pokemon">
                <img src={require('../../assets/pikachu.png')} alt="pokemon" />
              </div>
              <div className="profile-container__pokemons__item__team--pokemon">
                <img src={require('../../assets/pikachu.png')} alt="pokemon" />
              </div>
              <div className="profile-container__pokemons__item__team--pokemon">
                <img src={require('../../assets/pikachu.png')} alt="pokemon" />
              </div>
              <div className="profile-container__pokemons__item__team--pokemon">
               <img src={require('../../assets/pikachu.png')} alt="pokemon" />
              </div>
              <div className="profile-container__pokemons__item__team--pokemon">
                <img src={require('../../assets/pikachu.png')} alt="pokemon" />
              </div>
              <div className="profile-container__pokemons__item__team--pokemon">
                <img src={require('../../assets/pikachu.png')} alt="pokemon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
