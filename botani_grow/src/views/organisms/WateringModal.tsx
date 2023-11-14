import React, { useState } from 'react';
import './WateringModal.scss';

import { PlantInfo } from '../../types/plantInfo';
import { TbPlant } from 'react-icons/tb';
import { MdWaterDrop } from 'react-icons/md';

import { IoIosClose } from 'react-icons/io';
import { useModal } from '../../hooks/useModal';

type WateringModalProps = {
  plantId: string;
  plant: PlantInfo;
  toggleWateringModal: () => void;
};

export const WateringModal: React.FC<WateringModalProps> = ({
  plantId,
  plant,
  toggleWateringModal,
}) => {
  const { Modal, openModal, closeModal, show } = useModal();
  const [step, setStep] = useState(1);

  // Wateringモーダルを開く処理
  const handleOpen = () => {
    toggleWateringModal();
    openModal();
  };

  // Wateringモーダルを閉じる処理
  const handleClose = () => {
    closeModal();
  };

  const updateWateringData = async (id: string) => {};

  return (
    <>
      <div className="relative  watering__icon " onClick={handleOpen}>
        <button className="watering__button">
          <MdWaterDrop className=" icon fa-solid fa-plus" />
        </button>
        <div className=" text-gray-700 my-1.5">Watering</div>
      </div>
      <div className="m-8">
        <Modal show={show}>
          <div className="modal text-center w-72">
            <button className="close-modal-btn" onClick={closeModal}>
              <IoIosClose className="close-icon" />
            </button>

            {plant.iconUrl && (
              <img
                src={plant.iconUrl}
                alt={plant.name}
                className="wateringPlantIcon mx-auto"
              />
            )}

            <div className="mx-auto my-4 w-60">
              <h3 className="text-xl font-black text-gray-800">
                {plant.name}に水をあげよう
              </h3>
              <p className="text-sm my-2 text-gray-500">
                *気が向いたら剪定もしておこう
              </p>
            </div>
            <div className="flex justify-end gap-4 mt-10 w-full">
              <button className="btn btn-cancel mt-2" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleClose}>
                Quit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
