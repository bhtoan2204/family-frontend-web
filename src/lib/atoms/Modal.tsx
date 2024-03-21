"use client"
import React, { ReactNode, useEffect, useRef } from 'react';

interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setShowModal: (show: boolean) => void;
  setModalContent?: (content: ReactNode) => void;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, setModalContent, children, className, ...rest }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
        if (setModalContent) {
          setModalContent(null);
        }
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowModal(false);
        if (setModalContent) {
          setModalContent(null);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setShowModal, setModalContent]);
  return (
    <div className={`h-screen w-screen fixed  border-2 border-orange-200 bg-black bg-opacity-60 flex flex-col justify-center items-center transition ease-in z-10 ${className}`} style={{ transitionDuration: '0.5s' }} >
      <div ref={modalRef} className=" w-1/2 h-auto bg-white " >
        {children}
      </div>


    </div>
  );
};

export default Modal;
