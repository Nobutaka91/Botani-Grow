import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantInfo } from '../../types/plantInfo';
import { db } from '../../config/Firebase';
import './EndCareModal.scss';

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

export const EndCareModal: React.FC<EndCareModalProps> = ({
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
          <div className="mx-auto my-4 w-64">
            <h3 className="text-xl font-black text-gray-800">
              End "{plantName}" Care?
            </h3>
            <p className="text-sm my-2 text-gray-500">
              This plant will be moved to the Archive.
            </p>
          </div>
          <div className="flex gap-4 mt-7">
            <button
              className="btn btn-danger w-full mt-2"
              onClick={() => {
                updateIsArchived(plantId);
                closeModal();
              }}
            >
              End Care
            </button>
            <button className="btn btn-light w-full mt-2" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
