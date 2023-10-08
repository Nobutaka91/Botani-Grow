import React from 'react';
import { Link } from 'react-router-dom';

import './Card.scss';
import { PlantInfo } from '../../types/plantInfo';

type CardProps = {
  plant: PlantInfo;
};

export const Card: React.FC<CardProps> = ({ plant }) => {
  const style = {
    backgroundImage: plant.iconUrl ? `url(${plant.iconUrl})` : 'none',
  };

  return (
    <Link to={`/Plants/${plant.id}`}>
      <div className="card" style={style}>
        <div></div>
        <div className="cardInfo">
          <h3 className="name">{plant.name}</h3>
          <span className="flex"></span>
        </div>
      </div>
    </Link>
  );
};
