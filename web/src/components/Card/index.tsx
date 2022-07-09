import { useEffect, useState } from 'react';
import { IPokemonData, PokemonTypes } from '../../services/pokedex.service';
import Types from '../Types';
import IdAdjust from '../../utils/IdAdjust';
import './styles.scss';
import './../../pages/styles.scss';

interface CardProps {
  id: number;
  name: string;
  types: PokemonTypes[];
  image: string;
  pokemon: IPokemonData;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPokemon: React.Dispatch<React.SetStateAction<IPokemonData>>
}

function Card({ name, id, types, image, setId, setIsOpen, pokemon, setPokemon }: CardProps) {
  const [ newId, setNewId ] = useState('');

  function handleSetId() {
    setId(id);
    setIsOpen(true);
    setPokemon(pokemon);
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
