import React from 'react';
import { FaCopy } from 'react-icons/fa';
import './styles.scss';

function TrainerCard() {
  return (
    <>
      <div className="trainer-container">
        <div className="trainer-container__img">
          <img/>
        </div>
        <div className="trainer-container__info">
          <div className="trainer-container__info--name">Milton</div>
          <div className="trainer-container__info--tid"><b>#</b>153456</div>
        </div>
        <div className="trainer-container__copy">
          <FaCopy/>
        </div>
      </div>
    </>
  );
}

export default TrainerCard;
