import React, { useState } from 'react';
import './styles.scss';

interface IFilterProps {
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Filter(props: IFilterProps) {
  const [filterData, setFilterData] = useState<any>();
  function handleApply() {
    props.setFilterOpen(false);
  }

  return(
    <div className="filter-container">
      <div className="filter-container__types">
        <span>Types</span>
        <div className="filter-container__types__row">
          <div className="type-button" onClick={() => setFilterData('grass')}>grass</div>
          <div className="type-button">poison</div>
          <div className="type-button">fire</div>
          <div className="type-button">flying</div>
          <div className="type-button">water</div>
          <div className="type-button">bug</div>
          <div className="type-button">electric</div>
          <div className="type-button">ground</div>
          <div className="type-button">fairy</div>
          <div className="type-button">fighting</div>
          <div className="type-button">psychic</div>
          <div className="type-button">rock</div>
          <div className="type-button">steel</div>
          <div className="type-button">ice</div>
          <div className="type-button">ghost</div>
          <div className="type-button">dragon</div>
          <div className="type-button">normal</div>
        </div>
      </div>
      <div className="filter-container__stats">
        <span>Stats</span>
        <div className="filter-container__stats__row">
          <div className="type-button">hp</div>
          <div className="type-button">atk</div>
          <div className="type-button">s. atk</div>
          <div className="type-button">def</div> 
          <div className="type-button">s. def</div> 
          <div className="type-button">speed</div> 
        </div>
      </div>
      <div className="filter-container__button">
        <button onClick={() => { handleApply(); }}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default Filter;