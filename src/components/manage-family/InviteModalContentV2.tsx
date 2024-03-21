import React, { useContext, useEffect, useRef, useState } from 'react'
import SelectInput from '../select-input/SelectInput'
import RoleDropdown from './RoleDropdown'
import { string } from 'zod'
import useModal from '@/hooks/useModal'
import { ModalContext } from '@/providers/ModalProvider'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import LocalStorage from '@/store/local-storage'

const InviteModalContentV2 = () => {
    const { setModalContent, setShowModal } = useContext(ModalContext)!;
    const [str, setString] = useState('')
    const [role, setRole] = useState<String>("user_common")
    const [step, setStep] = useState(1)
    const { modalRef, visible } = useModal();


    const renderStep = () => {
        switch (step) {
            case 1:
                return <InputModal setShowModal={setShowModal} setString={setString} setRole={setRole} str={str} role={role} setStep={setStep} />
            case 2:
                return <SuccessModal info={str} role={role} setStep={setStep} setShowModal={setShowModal} setString={setString} setRole={setRole} />
        }
    }
    return (
        <div className={`h-screen w-screen fixed flex justify-center items-center z-10 `} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', transition: 'background-color 0.2s' }}>
            <div ref={modalRef} className={` h-auto w-[40rem] bg-white transition transform ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transition: 'opacity 0.2s, transform 0.1s' }}>
                {renderStep()}
            </div>
        </div>

    )
}

const InputModal = ({ setShowModal, setString, setRole, str, role, setStep }: any) => {
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const params = useParams()
    // const familyDetail = useSelector((state: RootState) => state.getFamilyDetail)
    useEffect(() => {
        if (showError == true) {
            setTimeout(() => {
                setShowError(false)
            }, 4000)
        }
    }, [showError])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const accessToken = LocalStorage.GetAccessToken()
            console.log("gmail: ", str, "role", role, "familyId", params["familyId"], "accessToken", accessToken)
            await axios.post("/api/family/invite", {
                id_family: parseInt(params["familyId"] as string),
                gmail: str,
                role: role,
                phone: '',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            
            setStep(2)

        } catch (error: any) {
            setShowError(true)
            setErrorMsg(error.message)
        }

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
        {
            showError && <div className='mt-3 mx-12 '>
                <p className='text-red-700 text-sm'>{errorMsg}</p>
            </div>
        }

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
                <div className='w-full flex flex-col justify-center items-center mt-12'>
                    <div className='flex flex-col items-center justify-center bg-[#D9EBE6] rounded-full w-12 h-12 '>
                        <div className="text-[#19866A] text-xl ">
                            &#x2713;
                        </div>
                    </div>
                    <p className='mt-4'>Sent</p>
                </div>
                <div className='flex flex-row font-normal text-sm justify-between  items-center mt-14 mb-14 ' >
                    <div className='flex flex-row gap-4 items-center'>
                        <div className='p-2 bg-[#F6F6F6]'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                            </svg>
                        </div>

                        <p className='font-semibold text-base'>To: {info}</p>
                    </div>
                    <p className='text-base'>Invited as {role}</p>

                </div>
                <div className="mt-4">
                    <div className=' mt-4 flex flex-row justify-end mb-[1.5%] gap-4 '>

                        <button className="px-4 py-2 mb-4 border border-[#dadada] rounded-sm text-sm font-semibold" onClick={() => {
                            setStep(1)
                            setRole(0)
                            setString('')
                        }} >Invite more people</button>
                        <button className="px-4 py-2 mb-4 bg-[#007A5A] rounded-sm text-sm font-semibold text-white " onClick={() => {
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
export default InviteModalContentV2