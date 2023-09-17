import React, { ReactNode, useState } from 'react';

export const useModal = () => {
  const [show, setShow] = useState(false); // モーダルの表示・非表示

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
    return show ? (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="fixed inset-0 bg-gray-600 opacity-50"></div>
        <div className="relative">{children}</div>
      </div>
    ) : null; // ブラウザに表示する内容
  };
  return { Modal, openModal, closeModal };
};
