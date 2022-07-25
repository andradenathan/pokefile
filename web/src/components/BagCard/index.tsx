import React, { useEffect, useState } from 'react';
import { TbPokeball, TbTrash, TbHeart, TbGenderFemale, TbGenderMale } from 'react-icons/tb';
import './styles.scss';
import './../../pages/styles.scss';
import { handlePokemonImages } from '../../hooks/usePokemonImage';
import { addPokemonAsFavorite, addPokemonInTeam, IBag, removePokemon } from '../../services/trainer.service';
import { useAuth } from '../../hooks/useAuth';

interface IBagCardProps {
  bag: IBag;
  setTrainerBag: React.Dispatch<React.SetStateAction<IBag[]>>;
  handleBag: Boolean;
  setHandleBag: React.Dispatch<React.SetStateAction<boolean>>;
}

function BagCard(props: IBagCardProps) {

  const { code } = useAuth();
  const [ openEdit, setOpenEdit ] = useState(false);
  
  async function handleDelete(bagId: number): Promise<void> { 
    const option = window.confirm("Do you really want to remove this Pokemon from your bag?");
    if(!option) return;

    await removePokemon(bagId);
    alert('Pokemon removed from the bag.');
    setOpenEdit(false);
    props.setHandleBag(!props.handleBag);
    return;
  }

  async function handleAddInTeam(bagId: number): Promise<void> {
    try {
      const response = await addPokemonInTeam(code, bagId);
      if(!response.data.success) return;
      alert('Pokemon added in your team.');
      setOpenEdit(false);
      props.setHandleBag(!props.handleBag);
    } catch(err: any) {
      if(err.response.status === 422) {
        alert("You can't add more than 6 pokemons in your team.");
        setOpenEdit(false);
      }
    }
  }

  async function handleAddAsFavorite(bagId: number): Promise<void> {
    try {
      const response = await addPokemonAsFavorite(code, bagId);
      if(!response.data.success) return;
      alert('Pokemon added as your favorite.');
      setOpenEdit(false);
      props.setHandleBag(!props.handleBag);
    } catch(err) {
      alert(err);
    }
  }

  useEffect(() => {
    console.log("Changed.");
  }, [props.bag]);

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
        <div className="bagcard-container__name">{props.bag.pokemon.name}</div>
        <div className="bagcard-container__img">
          <img 
            src={handlePokemonImages(props.bag.pokemonId, props.bag.pokemon.image, false)}
            className="bagcard-container__image"
            alt="pokemon"
          />
        </div>
        <div className="bagcard-container__details">
          <div className="bagcard-container__details__list">
            {
              props.bag.pokemonGender == "M" ?
              <div className="bagcard-container__details__list__item">
                <TbGenderMale/>
              </div> :
              <div className="bagcard-container__details__list__item">
                <TbGenderFemale/>
              </div>
            }
          </div>
          <div className="bagcard-container__details__list">
            {
              props.bag.isFavorite &&
              <div className="bagcard-container__details__list__item">
                <TbHeart color="#FF0000"/>
              </div>
            }
            {
              props.bag.isTeam &&
              <div className="bagcard-container__details__list__item">
                <TbPokeball/>
              </div>
            }
          </div>
        </div>
      </div>
    }
    </>
  );
}

export default BagCard;