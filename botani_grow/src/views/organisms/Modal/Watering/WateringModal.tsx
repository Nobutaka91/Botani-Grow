import React, { useState } from 'react';
import './WateringModal.scss';

import { PlantInfo } from '../../../../types/plantInfo';
import { useModal } from '../../../../hooks/useModal';
import { WateringRate } from './FirstStep/WateringRate';
import { FirstStepContent } from './FirstStep/FirstStepContent';
import { SecondStepContent } from './SecondStep/SecondStepContent';
import { ThirdStepContent } from './ThirdStep/ThirdStepContent';

import { TbPlant, TbChevronRight } from 'react-icons/tb';
import { MdWaterDrop } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';

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

  // 次のステップへ進む処理
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // 現在のステップに基づいてモーダルのコンテンツを表示する
  const renderModalContent = () => {
    switch (step) {
      case 1:
        return <FirstStepContent plant={plant} />;
      case 2:
        return <SecondStepContent />;
      case 3:
        return <ThirdStepContent />;
      default:
        return null;
    }
  };

  // Wateringモーダルを開く処理
  const handleOpen = () => {
    toggleWateringModal();
    openModal();
  };

  // Wateringモーダルを閉じる処理
  const handleClose = () => {
    setStep(1); // ステップを1にリセット
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
          <div className="wateringModal text-center w-72">
            {/* <button className="close-modal-btn" onClick={handleClose}>
              <IoIosClose className="close-icon" />
            </button> */}
            {(step == 1 || step == 2) && (
              <span className="currentPage">step {step} / 2</span>
            )}
            {/* ステップに応じたコンテンツの描画 */}
            {renderModalContent()}
            {/* ステップに応じたボタンの表示切り替え */}
            <div className="flex  gap-4 mt-20 w-full">
              {step < 3 && (
                <button className="btn btn-cancel mt-2" onClick={handleClose}>
                  Cancel
                </button>
              )}

              <button
                className="btn btn-next-step"
                onClick={step < 3 ? handleNext : handleClose}
              >
                <div className="flex gap-1.5">
                  <span>
                    {step == 1 && 'Next'}
                    {step == 2 && 'Submit'}
                    {step > 2 && 'Okay'}
                  </span>
                  {step == 1 && <TbChevronRight />}
                </div>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
