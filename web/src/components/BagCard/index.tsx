import React, { useState } from 'react';
import { TbPokeball, TbTrash, TbHeart } from 'react-icons/tb';
import './styles.scss';
import './../../pages/styles.scss';
import { handlePokemonImages } from '../../hooks/usePokemonImage';
import { addPokemonAsFavorite, addPokemonInTeam, IBag, removePokemon } from '../../services/trainer.service';
import { useAuth } from '../../hooks/useAuth';

interface IBagCardProps {
  bag: IBag;
  setTrainerBag: React.Dispatch<React.SetStateAction<IBag[]>>;
}

function BagCard(props: IBagCardProps) {
  const { code } = useAuth();
  
  async function handleDelete(bagId: number): Promise<void> { 
    const option = window.confirm("Do you really want to remove this Pokemon from your bag?");
    if(!option) return;

    await removePokemon(bagId);
    alert('Pokemon removed from the bag');
    return;
  }

  async function handleAddInTeam(bagId: number): Promise<void> {
    try {
      const response = await addPokemonInTeam(code, bagId);
      if(!response.data.success) return;
      alert('Pokemon added in your team');
    } catch(err: any) {
      if(err.response.status === 422) {
        alert("You can't add more than 6 pokemons in your team");
      }
    }
  }

  async function handleAddAsFavorite(bagId: number): Promise<void> {
    try {
      const response = await addPokemonAsFavorite(code, bagId);
      if(!response.data.success) return;
      alert('Pokemon added as your favorite');
    } catch(err) {
      alert(err);
    }
  }

  const [ openEdit, setOpenEdit ] = useState(false);

  return (
    <>
    {
      openEdit ? 
      <div className="bagcard-container bag-edit">
        <div className="bag-edit__delete" onClick={() => {
            setOpenEdit(false);
          }}>x</div>
        <div className="bag-edit__options">
          <span onClick={() => handleAddAsFavorite(props.bag.id)}><TbHeart className="edit-icon"/>Favorite</span>
          <span onClick={() => handleAddInTeam(props.bag.id)}><TbPokeball className="edit-icon"/>Team Add</span>
          <span onClick={() => handleDelete(props.bag.id)}><TbTrash className="edit-icon"/>Remove</span>
        </div>
      </div>
      :
      <div className="bagcard-container" onClick={() => {setOpenEdit(true)}}>
        <div className="bagcard-container__level">LvL {props.bag.level}</div>
        <div className="bagcard-container__img">
          <img 
            src={handlePokemonImages(props.bag.pokemonId, props.bag.pokemon.image)}
            className="bagcard-container__image"
            alt="pokemon"
          />
        </div>
        <div className="bagcard-container__details">
        </div>
      </div>
    }
    </>
  );
}

export default BagCard;