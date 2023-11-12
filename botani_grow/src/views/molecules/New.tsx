import React from 'react';
import './New.scss';

import { Link } from 'react-router-dom';
import { LiaSeedlingSolid } from 'react-icons/lia';

export const New = () => {
  return (
    <span className="relative group">
      <Link
        to="/AddNewPlant"
        className="newPlant-Link  text-slate-700  text-base "
      >
        <div className="newPlant-icon">
          <LiaSeedlingSolid />
        </div>
      </Link>
      <span className="whitespace-nowrap rounded-lg bg-slate-700 px-2 py-1 text-sm text-white absolute top-12 -left-7 opacity-0 group-hover:opacity-100 transition pointer-events-none">
        Add new plant
      </span>
    </span>
  );
};
