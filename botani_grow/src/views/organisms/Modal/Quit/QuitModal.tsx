import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantInfo } from '../../../../types/plantInfo';
import { db } from '../../../../config/Firebase';
import './QuitModal.scss';

import { doc, updateDoc } from 'firebase/firestore';

import { IoIosClose } from 'react-icons/io';
import { TbPlantOff } from 'react-icons/tb';
import { useModal } from '../../../../hooks/useModal';

type QuitModalProps = {
  plantId: string;
  plantsData: PlantInfo[];
  setPlantsData: React.Dispatch<React.SetStateAction<PlantInfo[]>>;
  plant: PlantInfo;
  toggleQuitModal: () => void;
};

export const QuitModal: React.FC<QuitModalProps> = ({
  plantId,
  plantsData,
  setPlantsData,
  plant,
  toggleQuitModal,
}) => {
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const navigate = useNavigate();
  const { Modal, openModal, closeModal, show } = useModal();

  // Quitモーダルを開く処理
  const handleOpen = () => {
    toggleQuitModal();
    openModal();
  };

  // Quitモーダルを閉じる処理
  const handleClose = () => {
    closeModal();
  };

  const updateIsArchived = async (id: string) => {
    try {
      const docRef = doc(db, 'plants', id);
      await updateDoc(docRef, {
        isArchived: true,
      });

      const updatedPlants = plantsData.map((plant) =>
        plant.id === id ? { ...plant, isArchived: true } : plant
      );
      setPlantsData(updatedPlants);

      setIsArchived(true);

      navigate('/Plants');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <>
      {/* Quitボタン　*/}
      <div className="relative delete__icon " onClick={handleOpen}>
        <button className="delete__button relative overflow-visible">
          <TbPlantOff className="icon fa-solid fa-plus" />
        </button>
        <div className=" text-gray-700 my-1.5">Quit</div>
      </div>
      <div className="m-8">
        <Modal show={show}>
          <div className="modal text-center w-72">
            {/* <button className="close-modal-btn" onClick={closeModal}>
              <IoIosClose className="close-icon" />
            </button> */}
            {plant.iconUrl && (
              <img
                src={plant.iconUrl}
                alt={plant.name}
                className="quitPlantIcon mx-auto mt-4 h-14 w-14 "
              />
            )}
            <div className="mx-auto my-4 w-60">
              <h3 className="text-xl font-black text-gray-800">
                {plant.name}の管理をやめますか?
              </h3>
              <p className="text-sm my-2 text-gray-500">
                *この植物はArchiveに移動されて、閲覧のみ有効になります
              </p>
            </div>
            <div className="flex justify-end gap-4 mt-8 w-full">
              <button className="btn btn-cancel mt-2" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  updateIsArchived(plantId);
                  handleClose();
                }}
              >
                Quit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
