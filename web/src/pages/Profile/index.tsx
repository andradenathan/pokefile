import { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { IAuthenticatedTrainer } from '../../services/auth.service';
import { FaCopy } from 'react-icons/fa';
import './styles.scss';
import '../styles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetails, getFavoritePokemon, getPokemonInTeam, getTrainer, IBag, ICodeData, IProfileDetails } from '../../services/trainer.service';
import { useAuth } from '../../hooks/useAuth';
import { handlePokemonImages } from '../../hooks/usePokemonImage';
import copyToClipboard from '../../utils/copyToClipboard';

function Profile() {
  const params = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<IAuthenticatedTrainer | null>({} as IAuthenticatedTrainer);
  const [team, setTeam] = useState<IBag[]>([]);
  const [favorite, setFavorite] = useState<IBag | null>(null);
  const [details, setDetails] = useState<IProfileDetails>({collections: 0, pokedex: 0, favoriteType: "-"});

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

    async function getTeam() {
      const { data } = await getPokemonInTeam(parseInt(params.code as string));
      if(!data.success) return;

      setTeam(data.success.bag);
    }

    async function getFavorite() {
      const { data } = await getFavoritePokemon(parseInt(params.code as string));
      if(!data.success) return;
      
      setFavorite(data.success.bag);
    }

    async function getProfileDetails() {
      const { data } = await getDetails(parseInt(params.code as string));
      if(!data.success) return;

      setDetails(data.success.user);
    }

    getTeam();
    getFavorite();
    getProfileDetails();
  }, [params.code]);
  console.log(details);
  useEffect(() => {
    if(document.readyState !== "complete") return;
    if(trainer == null) {
      navigate("/login");
    }
  });

  return (
    <>
      <Menu/>
      <div className="profile-container">
        <div className="profile-container__user">
          <div className="profile-container__user__img">
            <img             
              src={trainer?.avatar}
              className="profile-container__image"
              alt="cap"
            />
          </div>
          <div className="profile-container__user__infos">
            <div className="profile-container__user__infos__username">
              <span className="profile-container__user__infos__username__name">{trainer?.name}</span>
              <div className="profile-container__user__infos__username__usercode">
                <span className="profile-container__user__infos__username__usercode--code">{trainer?.code}</span>
                <div onClick={() => copyToClipboard(trainer!.code.toString())} className="profile-container__user__infos__username__usercode--icon">
                  <FaCopy/>
                </div>
              </div>
            </div>
            <div className="profile-container__user__infos__userdesc">
              <div className="profile-container__user__infos__userdesc__items">
                <div className="profile-container__user__infos__userdesc__items--item">
                  <p>Collection</p>
                  <span>{details?.collections}</span>
                </div>
                <div className="profile-container__user__infos__userdesc__items--item">
                  <p>Pokédex</p>
                  <span>{details?.pokedex}/151</span>
                </div>
                <div className="profile-container__user__infos__userdesc__items--item">
                  <p>Favorite Type</p>
                  <span>{details?.favoriteType}</span>
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
            {favorite !== null ? 
                <img key={favorite.id} src={handlePokemonImages(favorite.pokemonId, favorite.pokemon.image)} alt="pokemon" />
                :
                <img src={require('../../assets/pikachu.png')} alt="pokemon" />
              }
            </div>
          </div>
          <div className="profile-container__pokemons__item">
            <div className="profile-container__pokemons__item--label">team</div>
            <div className="profile-container__pokemons__item__team">
              {team.map((pokemon, index) => {
                return (
                <div className="profile-container__pokemons__item__team--pokemon">
                  <img key={index} src={handlePokemonImages(pokemon.pokemonId, pokemon.pokemon.image)} alt="pokemon" />
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
