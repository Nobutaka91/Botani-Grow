import React from 'react';
import { Link } from 'react-router-dom';

import './Card.scss';
import { GiWateringCan } from 'react-icons/gi';

type PlantInfo = {
  id: string;
  iconUrl: string | null;
  name: string;
  wateringCycle: number; // 水やりの頻度(日数)
  // size: string;
  // leafCount: number;
  // startDate: Date;
  // wateringAmount: string; // 水やりの量(多, ふつう, 少)
  // condition: string; // 前回の状態(良, ふつう, 微妙)
};

export const Card: React.FC<PlantInfo> = ({
  id,
  iconUrl,
  name,
  wateringCycle,
}) => {
  const style = {
    backgroundImage: iconUrl ? `url(${iconUrl})` : 'none',
  };

  return (
    <Link to={`/Plants/${id}`}>
      <div className="card" style={style}>
        <div></div>
        <div className="cardInfo">
          <h3 className="name">{name}</h3>
          <span className="flex">
            {wateringCycle} days left{' '}
            <GiWateringCan className="fa-solid fa-location-dot" />
          </span>
          {/* のちほどコメントも追加 */}
          {/* <p>{comment}</p> */}
        </div>
      </div>
    </Link>
  );
};
