"use client"
import { createContext, useState } from "react";

interface ModalContextType {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalContent: React.ReactNode;
    setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const value = { showModal, setShowModal, modalContent, setModalContent };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider