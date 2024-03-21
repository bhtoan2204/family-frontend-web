import React from 'react'

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    show: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, children, ...rest }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal" {...rest}>
            {children}
        </div>
    );
};

export default Modal