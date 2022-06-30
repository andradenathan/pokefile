import { useEffect, useState } from 'react';
import { PokemonTypes } from '../../services/pokedex.service';
import Types from '../Types';
import IdAdjust from '../../utils/IdAdjust';
import './styles.scss';
import './../../pages/styles.scss';

interface CardProps {
  id: number;
  name: string;
  types: PokemonTypes[];
  image: string;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Card({ name, id, types, image, setId, setIsOpen }: CardProps) {
  const [ newId, setNewId ] = useState('');

  function handleSetId() {
    setId(id);
    setIsOpen(true);
  }

  useEffect(() => {
    IdAdjust({ id: id, setNewId: setNewId });
  }, [])

  return (
    <>
      <div className="card-container" onClick={() => { handleSetId() }}>
        <div className="card-container__add"
             onClick={(e) => {
              e.stopPropagation(); 
              console.log("+")
        }}>+</div>
        <div className="card-container__img">
          <img
            src={image}
            className="card-container__image"
            alt="pokemon"
          />
        </div>
        <div className="card-container__number">#{newId}</div>
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
