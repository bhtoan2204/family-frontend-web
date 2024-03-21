import React from 'react'
import SelectInput from '../../../components/select-input/SelectInput'

const Modal = ({ setShowModal, children }: any) => {
    return (
        <div className="h-screen w-screen fixed   bg-[#666666] bg-opacity-80 flex flex-col justify-center items-center " >
            <div className=" w-1/2 h-auto bg-white border   border-blue-400  rounded-lg" onClick={() => { }}>
                {children}
            </div>


        </div>
    )
}

export default Modal