import React from 'react';
import './EditSidebar.scss';

import { PlantInfo } from '../../types/plantInfo';

type EditSidebarProps = {
  toggleEditSidebar: () => void;
  plant: PlantInfo;
};

export const EditSidebar: React.FC<EditSidebarProps> = ({
  toggleEditSidebar,
  plant,
}) => {
  return (
    <div className="editSidebarContainer">
      <div>Edit</div>
    </div>
  );
};
