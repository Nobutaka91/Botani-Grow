import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantInfo } from '../../types/plantInfo';
import { db } from '../../config/Firebase';
import './QuitModal.scss';

import { doc, updateDoc } from 'firebase/firestore';

import { IoIosClose } from 'react-icons/io';
import { TbPlantOff } from 'react-icons/tb';

type EndCareModalProps = {
  show: boolean;
  closeModal: () => void;
  plantName: string;
  Modal: any;
  plantId: string;
  plantsData: PlantInfo[];
  setPlantsData: React.Dispatch<React.SetStateAction<PlantInfo[]>>;
};

export const QuitModal: React.FC<EndCareModalProps> = ({
  show,
  closeModal,
  plantName,
  plantId,
  Modal,
  plantsData,
  setPlantsData,
}) => {
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const navigate = useNavigate();

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
    <div className="m-8">
      <Modal show={show}>
        <div className="modal text-center w-72">
          <button className="close-modal-btn" onClick={closeModal}>
            <IoIosClose className="close-icon" />
          </button>
          <TbPlantOff
            className="plant-delete-icon mx-auto mt-4 text-red-500"
            size={56}
          />
          <div className="mx-auto my-4 w-60">
            <h3 className="text-xl font-black text-gray-800">
              {plantName}の管理をやめますか?
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
