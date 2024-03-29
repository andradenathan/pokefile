import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPokemonData } from '../../services/pokedex.service';
import Types from '../Types';
import IdAdjust from '../../utils/IdAdjust';
import { useAuth } from '../../hooks/useAuth';
import './styles.scss';
import './../../pages/styles.scss';
import { addPokemon } from '../../services/trainer.service';

interface CardProps {
  pokemon: IPokemonData;
  image: string;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPokemon: React.Dispatch<React.SetStateAction<IPokemonData>>;
}

function Card({ image, setId, setIsOpen, pokemon, setPokemon }: CardProps) {
  const [ newId, setNewId ] = useState('');
  const { signed } = useAuth();
  const navigate = useNavigate();
  const { code } = useAuth();

  function handleClick() {
    setId(pokemon.id);
    setIsOpen(true);
    setPokemon(pokemon);
  }

  async function handleAddPokemon() {
    const newPokemon = await addPokemon(code, pokemon.id);
    if(newPokemon.data.success) alert("Pokemon successfully added in your bag!");
    return;
  }

  useEffect(() => {
    IdAdjust({ id: pokemon.id, setNewId: setNewId });
  }, [])

  return (
    <>
      <div className="card-container" onClick={() => { handleClick() }}>
        <div className="card-container__add"
             onClick={(e) => {
              e.stopPropagation();
              signed ? handleAddPokemon() : navigate('/login');
        }}>+</div>
        <div className="card-container__img">
          <img
            src={image}
            className="card-container__image"
            alt="pokemon"
          />
        </div>
        <div className="card-container__number">#{newId}</div>
        <div className="card-container__name">{pokemon!.name}</div>
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
