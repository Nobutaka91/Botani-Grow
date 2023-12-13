import './New.scss';

import { LiaSeedlingSolid } from 'react-icons/lia';
import { NewPlantForm } from '../../pages/newPlantForm';
import { useModal } from '../../hooks/useModal';

export const New = () => {
  const { Modal, openModal, closeModal, show } = useModal();

  // NewPlantFormを開く処理
  const handleOpen = () => {
    openModal();
  };

  // NewPlantFormを閉じる処理
  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      <span className="relative group">
        <button
          className="newPlant-Link  text-slate-700  text-base "
          onClick={handleOpen}
        >
          <div className="newPlant-icon">
            <LiaSeedlingSolid />
          </div>
        </button>
        <span className="whitespace-nowrap rounded-lg bg-slate-700 px-2 py-1 text-sm text-white absolute top-12 -left-7 opacity-0 group-hover:opacity-100 transition pointer-events-none">
          Add new plant
        </span>
      </span>
      <Modal show={show}>
        <NewPlantForm handleClose={handleClose} />
      </Modal>
    </>
  );
};
