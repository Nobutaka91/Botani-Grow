import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantInfo } from '../../../../types/plantInfo';
import { db } from '../../../../config/Firebase';
import './QuitModal.scss';
import { doc, updateDoc } from 'firebase/firestore';
import { useModal } from '../../../../hooks/useModal';
import { FirstStepQuitContent } from './FirstStep/FirstStepQuitContent';
import { SecondStepQuitContent } from './SecondStep/SecondStepQuitContent';

import { IoIosClose } from 'react-icons/io';
import { TbPlantOff } from 'react-icons/tb';

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
  const [step, setStep] = useState(1);

  // 次のステップへ進む処理
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // 現在のステップに基づいてモーダルのコンテンツを表示する
  const renderQuitModalContent = () => {
    switch (step) {
      case 1:
        return <FirstStepQuitContent plant={plant} />;
      case 2:
        return <SecondStepQuitContent archivedPlant={plant} />;
      default:
        return null;
    }
  };

  // Quitモーダルを開く処理
  const handleOpen = () => {
    toggleQuitModal();
    openModal();
  };

  // Quitモーダルを閉じる処理
  const handleClose = () => {
    setStep(1); // ステップを1にリセット
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

      handleNext();
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
            {/* ステップに応じたコンテンツの描画 */}
            {renderQuitModalContent()}

            <div className="flex justify-end gap-4 mt-8 w-full">
              {step == 1 && (
                <>
                  <button className="btn btn-cancel mt-2" onClick={handleClose}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      updateIsArchived(plantId);
                    }}
                  >
                    Quit
                  </button>
                </>
              )}
              {step == 2 && (
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleClose();
                    navigate('/Plants');
                  }}
                >
                  Okay
                </button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
