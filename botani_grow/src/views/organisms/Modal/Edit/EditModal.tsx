import React from 'react';
import './EditModal.scss';

import { useModal } from '../../../../hooks/useModal';

import { PlantInfo } from '../../../../types/plantInfo';
import { MdEditDocument } from 'react-icons/md';

type EditModalProps = {
  toggleEditModal: () => void;
  plant: PlantInfo;
};

export const EditModal: React.FC<EditModalProps> = ({
  toggleEditModal,
  plant,
}) => {
  const { Modal, openModal, closeModal, show } = useModal();

  // Editモーダルを開く処理
  const handleOpen = () => {
    toggleEditModal();
    openModal(); // show -> true
  };

  const handleClose = () => {
    closeModal(); // show -> false
  };

  return (
    <>
      {/* Editボタン　*/}
      <div className="relative  edit__icon " onClick={handleOpen}>
        <button className="edit__button relative overflow-visible">
          <MdEditDocument className=" icon fa-solid fa-plus" />
        </button>
        <div className=" text-gray-700 my-1.5">Edit</div>
      </div>

      <Modal show={show}>
        <div className="editModalContainer">
          <div>Edit</div>
        </div>
      </Modal>
    </>
  );
};
