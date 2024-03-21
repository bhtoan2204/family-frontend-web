export interface IManageFamily {
    showModal: boolean
    setShowModal: (show: boolean) => void
    modalContent: React.ReactNode | null
    setModalContent: (content: React.ReactNode | null) => void
    showNav: boolean
    setShowNav: (show: boolean) => void
}
