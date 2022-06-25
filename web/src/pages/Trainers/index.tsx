import { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import TrainerCard from '../../components/TrainerCard';
import './styles.scss';
import '../styles.scss';
import { getTrainers, IUserData } from '../../services/trainer.service';

function Trainers() {
  const [trainers, setTrainers] = useState<IUserData[]>([]);

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
            />
          </div>
        </div>
        <div className="container__trainers">
          {trainers.map((trainer, key) => {
            return (
                <TrainerCard name={trainer.name} code={trainer.code} key={key}/>
              )
            }
          )}
        </div>
      </div>
    </>
  );
}

export default Trainers;
