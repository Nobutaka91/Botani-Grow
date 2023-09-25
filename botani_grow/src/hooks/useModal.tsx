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

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const Modal: React.FC<ModalProps> = React.memo(({ children, show }) => {
    const contentRef = useRef(null);

    useEffect(() => {
      if (contentRef.current === null) return;

      if (show) {
        disableBodyScroll(contentRef.current, {
          reserveScrollBarGap: true,
        });
      } else {
        enableBodyScroll(contentRef.current);
      }

      return () => {
        clearAllBodyScrollLocks();
      };
    }, [show, contentRef]);

    if (!show) return null;
    const element = document.getElementById('modal-root');
    if (!element) {
      // console.log('modal-root element is not found.');
      return null;
    }

    return createPortal(
      <div className="delete">
        <div className="delete-background"></div>
        <div className="relative" ref={contentRef}>
          {children}
        </div>
      </div>,
      element
    );
  });
  return { Modal, openModal, closeModal, show };
};
