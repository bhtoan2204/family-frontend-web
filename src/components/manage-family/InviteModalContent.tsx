import React, { useState } from 'react'
import SelectInput from '../select-input/SelectInput'
import RoleDropdown from './RoleDropdown'
import { string } from 'zod'

const InviteModalContent = ({ setShowModal }: any) => {
    const [str, setString] = useState('')
    const [role, setRole] = useState<number>(0)
    const [step, setStep] = useState(1)
    const renderStep = () => {
        switch (step) {
            case 1:
                return <InputModal setShowModal={setShowModal} setString={setString} setRole={setRole} str={str} role={role} setStep={setStep} />
            case 2:
                return <SuccessModal info={str} role={role} setStep={setStep} setShowModal={setShowModal} setString={setString} setRole={setRole} />
        }
    }
    return (
        renderStep()
    )
}

const InputModal = ({ setShowModal, setString, setRole, str, role, setStep }: any) => {
    const handleSubmit = () => {
        // setString("")
        // setRole(0)
        setStep(2)
        console.log(str, role)
    }
    return <React.Fragment>
        <div className="mt-[4%] mx-12 font-bold text-2xl flex justify-between transition">
            <div>
                Invite to family
            </div>
            <div className="text-[#606060] hover:cursor-pointer" onClick={() => {
                setShowModal(false)
            }}>
                &#x2715;
            </div>
        </div>
        <div className="mt-3 mx-12">
            To:
        </div>
        <div className="mx-12 mt-3">
            <SelectInput setString={setString} />
        </div>
        <div className="mt-3 mx-12">
            As:
        </div>
        <div className="mx-12 mt-3">
            <RoleDropdown setRole={setRole} />
        </div>
        <div className="mt-4 mx-12  flex flex-row justify-end mb-[4%]">
            <button className="px-4 py-2 mb-4 disabled:bg-[#DDDDDD] disalbed:text-black text-white bg-[#007A5A] rounded-sm text-sm font-semibold" onClick={handleSubmit} disabled={str == "" || role == 0}>Send</button>
        </div>
    </React.Fragment>
}

const SuccessModal = ({ info, role, setStep, setShowModal, setRole, setString }: any) => {
    return (
        <React.Fragment >
            <div className="mt-[4%]  mx-12 font-bold text-xl transition">
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center justify-center bg-[#D9EBE6] rounded-full w-12 h-12 '>
                        <div className="text-[#19866A] text-xl">
                            &#x2713;
                        </div>
                    </div>
                    <p className='mt-4'>Sent</p>
                </div>
                <div className='flex flex-row font-normal text-sm justify-between items-baseline mt-14 mb-14 ' >
                    <p className='font-semibold'>To: {info}</p>
                    <p>{role}</p>

                </div>
                <div className="mt-4">
                    <div className=' mt-4 flex flex-row justify-end mb-[1.5%] gap-4 '>

                        <button className="px-4 py-2 mb-4 border border-[#dadada] rounded-sm text-sm font-normal" onClick={() => {
                            setStep(1)
                            setRole(0)
                            setString('')
                        }} >Invite more people</button>
                        <button className="px-4 py-2 mb-4 bg-[#007A5A] rounded-sm text-sm font-normal text-white " onClick={() => {
                            setShowModal(false)
                            setRole(0)
                            setString('')
                        }} >Done</button>
                    </div>
                </div>
            </div>
            <div>

            </div>

        </React.Fragment>
    )
}
export default InviteModalContent