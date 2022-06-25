import React, { useEffect, useState } from 'react';
import './styles.scss';

export default function Types(props: {type: string}) {
  const [ color, setColor ] = useState("");
  
  useEffect(() => {
    switch(props.type) {
      case 'grass':
        setColor("#2DCD45"); break;
      case 'poison':
        setColor("#883688"); break;
      case 'fire':
        setColor("#F08030"); break;
      case 'flying':
        setColor("#A890F0"); break;
      case 'water':
        setColor("#149EFF"); break;
      case 'bug':
        setColor("#A8B820"); break;
      case 'electric':
        setColor("#F8D030"); break;
      case 'ground':
        setColor("#E0C068"); break;
      case 'fairy':
        setColor("#D5899A"); break;
      case 'fighting':
        setColor("#94352D"); break;
      case 'psychic':
        setColor("#FF6996"); break;
      case 'rock':
        setColor("#B8A038"); break;
      case 'steel':
        setColor("#B8B8D0"); break;
      case 'ice':
        setColor("#98D8D8"); break;
      case 'ghost':
        setColor("#614C83"); break;
      case 'dragon':
        setColor("#700AEE"); break;
      case 'normal':
        setColor("#A8A878"); break;
      default:
        setColor("#ffffff"); break;
    }
  }, [])

  return(
    <div className="type-container" style={{backgroundColor: `${color}`}}>
      <div className="type-container__name">{props.type}</div>
    </div>
  );
}