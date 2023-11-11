import React from 'react';
import './New.scss';

import { Link } from 'react-router-dom';
import { LiaSeedlingSolid } from 'react-icons/lia';

export const New = () => {
  return (
    <Link
      to="/AddNewPlant"
      className="newPlant-Link  text-slate-700  text-base "
    >
      <div className="newPlant-icon">
        <LiaSeedlingSolid />
      </div>
    </Link>
  );
};
