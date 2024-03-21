import { ModalContext } from '@/providers/ModalProvider';
import { useRef, useEffect, useState, useContext } from 'react';

function useModal() {
    const { setShowModal, setModalContent } = useContext(ModalContext)!;
    const modalRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        const closeModal = () => {
            setVisible(false);
            setShowModal(false);
            if (setModalContent) {
                setModalContent(null);
            }
        };

        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [setModalContent, setShowModal]);

    return { modalRef, visible };
}

export default useModal;
