import React from 'react';
import './PlantsLinks.scss';

import { TbPlant } from 'react-icons/tb';
import { RiPlantFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

type PlantLinksProps = {
  plantsData: Array<{
    id: string;
    iconUrl: string | null;
    name: string;
    isArchived: boolean;
  }>;
  currentPlantId: string;
};

export const PlantsLinks: React.FC<PlantLinksProps> = ({
  plantsData,
  currentPlantId,
}) => {
  return (
    <div className="plantsLinks">
      <p className="plantsList-title flex gap-1">
        <RiPlantFill className="icon pointer-events-none" color="green" />
        Plant List
      </p>
      {plantsData
        .filter((plant) => plant.id !== currentPlantId && !plant.isArchived)
        .map((plant) => (
          <Link to={`/Plants/${plant.id}`} key={plant.id}>
            <div className="flex gap-5 hover:bg-gray-100/75 p-1.5 rounded-lg cursor-pointer">
              {plant.iconUrl ? (
                <img
                  src={plant.iconUrl}
                  alt={plant.name}
                  className="plantLinkIcon"
                />
              ) : (
                <TbPlant className="icon fa-solid fa-plus" />
              )}
              <span className="plantLink-name">{plant.name}</span>
            </div>
          </Link>
        ))}
    </div>
  );
};
