import React from 'react';

import 'Delete.scss';

import { TbPlantOff } from 'react-icons/tb';

export const Delete = () => {
  return (
    <div>
      <button className="btn btn-danger">
        <TbPlantOff className="icon fa-solid fa-plus" />
      </button>
    </div>
  );
};
