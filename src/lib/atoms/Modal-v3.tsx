import React, { ReactNode, useEffect, useRef, useState } from 'react'
interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isModalOpen: boolean;
    modalContent?: ReactNode;
    onClose: () => void;
}
const Modalv3: React.FC<ModalProps> = ({ modalContent, isModalOpen, onClose, children, className, ...rest }) => {
    if (isModalOpen !== true) {
        return null;
    }
    else {
        return <React.Fragment>

            {modalContent}
        </React.Fragment>
    }

}

export default Modalv3