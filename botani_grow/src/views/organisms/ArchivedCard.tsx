import React from 'react';
import { Link } from 'react-router-dom';

import './ArchivedCard.scss';
import { PlantInfo } from '../../types/plantInfo';

type CardProps = {
  plant: PlantInfo;
};

export const ArchivedCard: React.FC<CardProps> = ({ plant }) => {
  const style = {
    backgroundImage: plant.iconUrl ? `url(${plant.iconUrl})` : 'none',
  };

  return (
    <Link to={`/Plants/${plant.id}`} className="archived-plantCard">
      <div className="archived-card" style={style}></div>
      <span className="archived-name text-xs text-gray-500 mb-1">
        {plant.name}
      </span>
    </Link>
  );
};
