import React from 'react';
import './EditModal.scss';

import { PlantInfo } from '../../../../types/plantInfo';

type EditModalProps = {
  toggleEditModal: () => void;
  plant: PlantInfo;
};

export const EditModal: React.FC<EditModalProps> = ({
  toggleEditModal,
  plant,
}) => {
  return (
    <div className="editModalContainer">
      <div>Edit</div>
    </div>
  );
};
