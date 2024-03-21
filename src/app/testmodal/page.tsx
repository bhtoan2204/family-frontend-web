"use client"
import React, { useState } from 'react'
// import Modal from '@/lib/atoms/manage/Modal/Modal'
import Modal from '@/lib/atoms/Modal'
const TestModal = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(
        <div>
            modal content here
        </div>
    );
    return (

        <div className='h-screen w-screen  '
        >
            {showModal && <Modal setShowModal={setShowModal} >{modalContent != null ? modalContent : <div>cnono</div>} </Modal>}
            <button onClick={() => {
                setShowModal(true)
            }}>show modal here </button>
        </div>
    )
}

export default TestModal