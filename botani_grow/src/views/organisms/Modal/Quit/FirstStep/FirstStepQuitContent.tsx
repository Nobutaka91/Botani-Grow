import React from 'react';
import { PlantInfo } from '../../../../../types/plantInfo';

type QuitPlantProps = {
  plant: PlantInfo;
};

export const FirstStepQuitContent: React.FC<QuitPlantProps> = ({ plant }) => {
  const { iconUrl, name } = plant;
  return (
    <>
      {iconUrl && (
        <img
          src={iconUrl}
          alt={name}
          className="quitPlantIcon mx-auto mt-4 h-14 w-14 "
        />
      )}
      <div className="mx-auto mt-8 mb-4 w-60">
        <h3 className="text-gray-700">
          <span className="font-semibold">"{plant.name}"</span>
          の水やり管理を
          <br />
          やめますか?
        </h3>
      </div>
    </>
  );
};
