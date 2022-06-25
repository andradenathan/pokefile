import { FaCopy } from 'react-icons/fa';
import './styles.scss';

interface ITrainersCardProps {
  name: string;
  code: number;
}

function TrainerCard({name, code}: ITrainersCardProps) {
  return (
    <>
      <div className="trainer-container">
        <div className="trainer-container__img">
          <img/>
        </div>
        <div className="trainer-container__info">
          <div className="trainer-container__info--name">{name}</div>
          <div className="trainer-container__info--tid"><b>#</b>{code}</div>
        </div>
        <div className="trainer-container__copy">
          <FaCopy/>
        </div>
      </div>
    </>
  );
}

export default TrainerCard;
