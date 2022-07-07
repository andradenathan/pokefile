import React from 'react';

interface IAdjustProps {
  id: number;
  setNewId: React.Dispatch<React.SetStateAction<string>>;
}

export default function IdAdjust(props: IAdjustProps) {
  if(props.id < 10) {
    props.setNewId('00'+props.id.toString());
  }
  else if(props.id < 100) {
    props.setNewId('0'+props.id.toString());
  }
  else {
    props.setNewId(props.id.toString());
  }
}