import { useEffect, useState } from 'react';
import { IPokemonData } from '../../services/pokedex.service';
import Types from '../Types';
import IdAdjust from '../../utils/IdAdjust';
import './styles.scss';
import './../../pages/styles.scss';

interface CardProps {
  pokemon: IPokemonData;
  image: string;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPokemon: React.Dispatch<React.SetStateAction<IPokemonData>>
}

function Card({ image, setId, setIsOpen, pokemon, setPokemon }: CardProps) {
  const [ newId, setNewId ] = useState('');

  function handleSetId() {
    setId(pokemon.id);
    setIsOpen(true);
    setPokemon(pokemon);
  }

  useEffect(() => {
    IdAdjust({ id: pokemon.id, setNewId: setNewId });
    
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
        <div className="card-container__name">{pokemon.name}</div>
        <div className="type-wrapper">
          {pokemon.type.map((type) => {
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
