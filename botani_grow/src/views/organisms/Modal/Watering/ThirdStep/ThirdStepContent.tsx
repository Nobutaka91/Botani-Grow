import React from 'react';

import { PlantInfo } from '../../../../../types/plantInfo';

type WateringPlantProps = {
  plant: PlantInfo;
};

export const ThirdStepContent: React.FC<WateringPlantProps> = ({ plant }) => {
  const { iconUrl, name } = plant;
  return (
    <>
      {iconUrl && (
        <img src={iconUrl} alt={name} className="wateringPlantIcon mx-auto" />
      )}
      <div className="mx-auto text-gray-800 pt-12 ">
        {name}の 次回の水やり日は
        <br />
      </div>
      <div className="mt-3 text-gray-800 text-lg">4月21日です</div>
    </>
  );
};
