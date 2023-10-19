import React from 'react';
import './PlantsLinks.scss';

import { TbPlantOff, TbPlant } from 'react-icons/tb';
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
        <TbPlant className="icon" color="green" />
        Plant List
      </p>
      {plantsData
        .filter((plant) => plant.id !== currentPlantId && !plant.isArchived)
        .map((plant) => (
          <Link to={`/Plants/${plant.id}`} key={plant.id}>
            <div className="flex gap-5">
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
