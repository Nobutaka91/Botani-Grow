import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

interface ModalProps {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = React.memo(
  ({ children, show, onClose }) => {
    const contentRef = useRef(null);

    // モーダルの背景のスクロールを停止するための処理
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
      return null;
    }

    return createPortal(
      <div className="delete">
        <div className="delete-background" onClick={onClose}></div>
        <div className="relative" ref={contentRef}>
          {children}
        </div>
      </div>,
      element
    );
  }
);
