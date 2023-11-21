import React from 'react';

import { WateringRate } from './WateringRate';
import { PlantInfo } from '../../../../../types/plantInfo';

type WateringPlantProps = {
  // plantId: string;
  plant: PlantInfo;
  // toggleWateringModal: () => void;
};

export const FirstStepContent: React.FC<WateringPlantProps> = ({ plant }) => {
  const { iconUrl, name } = plant;
  return (
    <>
      {iconUrl && (
        <img src={iconUrl} alt={name} className="wateringPlantIcon mx-auto" />
      )}

      <h3 className="text-basic font-black text-gray-800 py-2">
        {/* {name}に水をあげよう */}
        水をあげよう
      </h3>

      <div className="mx-auto my-4 w-60">
        <p className=" my-2 text-gray-500">
          <WateringRate />
        </p>
      </div>
    </>
  );
};
