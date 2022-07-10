import { FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

interface ITrainersCardProps {
  name: string;
  code: number;
  avatar: string;
}

function TrainerCard({name, code, avatar}: ITrainersCardProps) {

  const navigate = useNavigate();

  function handleTrainerProfile() {
    navigate(`/profile/${code}`);
  }

  return (
    <>
      <div className="trainer-container" onClick={() => { handleTrainerProfile(); }}>
        <div className="trainer-container__img">
          <img
            src={avatar}
            alt="cap"
          />
        </div>
        <div className="trainer-container__info">
          <div className="trainer-container__info--name">{name}</div>
          <div 
            className="trainer-container__info--tid"><b>#</b>{code}</div>
        </div>
        <div 
          onClick={(e) => {
            e.stopPropagation();
            console.log("hello!!")
          }} 
          className="trainer-container__copy">
          <FaCopy/>
        </div>
      </div>
    </>
  );
}

export default TrainerCard;
