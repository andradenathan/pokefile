import './styles.scss';
import './../../pages/styles.scss';
import { PokemonTypes } from '../../services/pokedex.service';
import Types from '../Types';

interface CardProps {
  id: number;
  name: string;
  types: PokemonTypes[];
  image: string;
}

function Card({ name, id, types, image }: CardProps) {
  return (
    <>
      <div className="card-container">
        <div className="card-container__add">+</div>
        <div className="card-container__img">
          <img
            src={image}
            className="card-container__image"
            alt="pokemon"
          />
        </div>
        <div className="card-container__number">Nº {id}</div>
        <div className="card-container__name">{name}</div>
        <div className="type-wrapper">
          {types.map((type) => {
            return (
              <Types type={type.name} />
            )
          })}
        </div>
      </div>
    </>
  );
}

export default Card;
