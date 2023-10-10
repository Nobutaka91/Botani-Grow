import React from 'react';
import { PlantInfo } from '../../types/plantInfo';
import { db } from '../../config/Firebase';
import { doc, deleteDoc } from 'firebase/firestore';

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
  const deletePlant = async (id: string) => {
    try {
      const plantRef = doc(db, 'plants', id);
      await deleteDoc(plantRef);
      console.log('Document successfully deleted!');

      // ローカルステートの更新
      const updatedPlantsData = plantsData.filter((plant) => plant.id !== id);
      setPlantsData(updatedPlantsData);
    } catch (error) {
      console.log('Error removing document:', error);
    }
  };

  return (
    <div className="m-8">
      <Modal show={show}>
        <div className="modal text-center w-56">
          <button className="close-modal-btn" onClick={closeModal}>
            <IoIosClose className="close-icon" />
          </button>
          <TbPlantOff
            className="plant-delete-icon mx-auto mt-5 text-red-500"
            size={56}
          />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-2xl font-black text-gray-800">
              Confirm Delete
            </h3>
            <p className="text-sm my-2 text-gray-500">
              Delete "{plantName}" data?
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="btn btn-danger w-full my-2"
              onClick={() => {
                deletePlant(plantId);
                closeModal();
              }}
            >
              Delete
            </button>
            <button className="btn btn-light w-full my-2" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
