import { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import TrainerCard from '../../components/TrainerCard';
import './styles.scss';
import '../styles.scss';
import { getTrainers, searchTrainer } from '../../services/trainer.service';
import { ITrainerData } from '../../models/trainer';

function Trainers() {
  const [trainers, setTrainers] = useState<ITrainerData[]>([]);
  const [search, setSearch] = useState<ITrainerData[]>([]);

  async function handleSearch(trainerName: string) {
    if (trainerName.length === 0) {
      setSearch([]);
    }

    const response = await searchTrainer(trainerName);

    if (!response.data.success || response.data.success.user.length === 0) {
      return;
    }

    setSearch(response.data.success.user);
  }

  useEffect(() => {
    async function getAllTrainers(): Promise<void> {
      try {
        const { data } = await getTrainers();

        if (data.success) {
          setTrainers(data.success.user);
          return;
        }

        return;
      } catch (err) {
        console.log(err);
      }
    }

    getAllTrainers();
  }, []);

  return (
    <>
      <Menu/>
      <div className="container">
        <div className="container-wrapper">
          <div className="container__title">
            <img 
              src={require('../../assets/cap.png')}
              alt="cap"  
            />
            <span>Trainers</span>
          </div>
          <div className="container__search">
            <FaSearch/>
            <input 
              className="container__search__bar"
              placeholder="Search by name or Trainer ID..."
              onChange={(event) => handleSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="container__trainers">
          {search.length > 0 ?
          search.map((trainer, key) => {
            return (
                <TrainerCard name={trainer.name} code={trainer.code} avatar={trainer.avatar} key={key}/>
              )
            }) :
            
          trainers.map((trainer, key) => {
            return (
                <TrainerCard name={trainer.name} code={trainer.code} avatar={trainer.avatar} key={key}/>
              )
            }
          )}
        </div>
      </div>
    </>
  );
}

export default Trainers;
