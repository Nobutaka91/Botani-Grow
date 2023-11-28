import React from 'react';
import { PlantInfo } from '../../../../../types/plantInfo';

type QuitPlantProps = {
  archivedPlant: PlantInfo;
};

export const SecondStepQuitContent: React.FC<QuitPlantProps> = ({
  archivedPlant,
}) => {
  const { name } = archivedPlant;
  return (
    <>
      <div className="mx-auto mt-28 mb-4 w-60">
        <p className="text-gray-700">{name}はArchiveに移動されました</p>
      </div>
    </>
  );
};
