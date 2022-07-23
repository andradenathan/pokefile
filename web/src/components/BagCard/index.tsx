import './styles.scss';
import './../../pages/styles.scss';
import { handlePokemonImages } from '../../hooks/usePokemonImage';
import { IBag, removePokemon } from '../../services/trainer.service';
import { useAuth } from '../../hooks/useAuth';

interface IBagCardProps {
  bag: IBag;
  setTrainerBag: React.Dispatch<React.SetStateAction<IBag[]>>;
}
function BagCard(props: IBagCardProps) {
  console.log(props.bag);
  async function handleDelete(bagId: number): Promise<void> { 
    await removePokemon(bagId);
    alert('Pokemon removed from bag');
    return;
  }

  return (
    <>
      <div className="bagcard-container">
        <div className="bagcard-container__delete" onClick={() => handleDelete(props.bag.id)}>x</div>
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
    </>
  );
}

export default BagCard;