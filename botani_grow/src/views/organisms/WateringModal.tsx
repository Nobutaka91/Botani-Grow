import React, { useState } from 'react';
import './WateringModal.scss';

import { PlantInfo } from '../../types/plantInfo';
import { TbPlant } from 'react-icons/tb';

import { IoIosClose } from 'react-icons/io';

type WateringModalProps = {
  show: boolean;
  closeModal: () => void;
  // plantName: string;
  Modal: any;
  plantId: string;
  plant: PlantInfo;
  setPlantsData: React.Dispatch<React.SetStateAction<PlantInfo[]>>;
};

export const WateringModal: React.FC<WateringModalProps> = ({
  show,
  closeModal,
  plantId,
  Modal,
  plant,
  setPlantsData,
}) => {
  const [step, setStep] = useState(1);

  const updateWateringData = async (id: string) => {};

  return (
    <div className="m-8">
      <Modal show={show}>
        <div className="modal text-center w-72">
          <button className="close-modal-btn" onClick={closeModal}>
            <IoIosClose className="close-icon" />
          </button>
          <div className="plant-delete-icon mx-auto mt-4 ">
            {plant.iconUrl && (
              <img
                src={plant.iconUrl}
                alt={plant.name}
                className="wateringPlantIcon"
              />
            )}
          </div>

          <div className="mx-auto my-4 w-60">
            <h3 className="text-xl font-black text-gray-800">
              {plant.name}に水をあげよう
            </h3>
            <p className="text-sm my-2 text-gray-500">
              *気が向いたら剪定もしておこう
            </p>
          </div>
          <div className="flex justify-end gap-4 mt-8 w-full">
            <button className="btn btn-cancel mt-2" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                // updateIsArchived(plantId);
                closeModal();
              }}
            >
              Quit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
