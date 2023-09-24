import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

interface ModalProps {
  children: ReactNode;
  show: boolean;
}

export const useModal = () => {
  const [show, setShow] = useState(false); // モーダルの表示・非表示

  const openModal = useCallback(() => {
    setShow(true);
  }, []);

  const closeModal = useCallback(() => {
    setShow(false);
  }, []);

  const element = document.getElementById('modal-root');

  const Modal: React.FC<ModalProps> = React.memo(({ children, show }) => {
    const contentRef = useRef(null);

    useEffect(() => {
      if (show) {
        disableBodyScroll(contentRef.current);
      } else {
        enableBodyScroll(contentRef.current);
      }

      return () => {
        clearAllBodyScrollLocks();
      };
    }, [show, contentRef]);

    if (!show) return null;
    if (!element) return null;

    return createPortal(
      // <div className="fixed inset-0 flex justify-center items-center">
      //   <div className="fixed inset-0 bg-gray-600 opacity-50"></div>
      //   <div className="relative  rounded-lg shadow-lg w-11/12 md:w-1/2 max-w-lg">
      //     {children}
      //   </div>
      // </div>
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="fixed inset-0 bg-gray-600 opacity-50"></div>
        <div
          className="relative  rounded-lg shadow-lg w-11/12 md:w-1/2"
          ref={contentRef}
        >
          {children}
        </div>
      </div>,
      element
    );
  });
  return { Modal, openModal, closeModal, show };
};
