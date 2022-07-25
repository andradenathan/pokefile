import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Menu from '../../components/Menu';
import BagCard from '../../components/BagCard';
import { FaSearch } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import './styles.scss';
import '../styles.scss';
import { getTrainerBag, IBag } from '../../services/trainer.service';

function Bag() {
  const navigate = useNavigate();
  const { signed, code } = useAuth();
  const [ handleBag, setHandleBag ] = useState(false);
  const [ trainerBag, setTrainerBag ] = useState<IBag[]>([]);

  function handleSignedIn() {
    signed ? console.log("signed.") : navigate("/login");
  }

  function handleTrainerBag() {
    (async() => {
      const { data } = await getTrainerBag(code);
      if(!data.success) return;

      setTrainerBag(data.success.bag);
    })();
  }

  useEffect(() => {
    handleSignedIn();
    handleTrainerBag();
    // (async() => {
    //   const { data } = await getTrainerBag(code);
    //   if(!data.success) return;

    //   setTrainerBag(data.success.bag);
    // })();
  }, []);

  useEffect(() => {
    handleTrainerBag();
  }, [handleBag])

  console.log(trainerBag)

  return (
    <>
      <Menu/>
      <div className="container">
        <div className="container-wrapper">
          <div className="container__title">
            <img 
              src={require('../../assets/backpack.png')}
              alt="pikachu"
            />
            <span>Bag</span>
          </div>
          {/* <div className="container__search">
            <FaSearch/>
            <input 
              className="container__search__bar"
              placeholder="Search by name or type..."
            />
            <div className="container__search__filter">
              <BsFilter/>
            </div>
          </div>
          <div className="container__filter-box"></div> */}
        </div>
          {
            trainerBag.length > 0 ?
             <div className="bag">
              {trainerBag.map((pokemon, key) => {
                return (
                  <BagCard
                    key={key}
                    bag={pokemon}
                    setTrainerBag={setTrainerBag}
                    handleBag={handleBag}
                    setHandleBag={setHandleBag}
                  />
                )
              })}
            </div> :
            <div className="bag-empty">
              <div className="bag-empty__img">
                <img src={require('../../assets/pikachu.png')}/>
              </div>
              <span>Your bag is empty! If you want to add Pokémons here,
                visit our Pokédex.
              </span>
            </div>
          }
      </div>
    </>
  );
}

export default Bag;
