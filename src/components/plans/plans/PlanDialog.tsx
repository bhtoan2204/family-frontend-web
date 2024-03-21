import useModal from '@/hooks/useModal';
import { ModalContext } from '@/providers/ModalProvider';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react'

const PlanDialog = () => {
    // const { showModal, setShowModal, modalContent, setModalContent } = useContext(ManageFamilyContext) as IManageFamily;
    const router = useRouter();
    const params = useParams();
    const familyId = params["familyId"];
    const { modalRef, visible } = useModal();
    const { setShowModal, modalContent } = useContext(ModalContext)!;;
    return (
        <div className={`h-screen w-screen fixed z-10  `} style={{ backgroundColor: "transparent", transition: 'background-color 0.2s' }}>
            <div ref={modalRef} className={` h-auto w-[14rem] bg-white transition transform absolute right-40 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transition: 'opacity 0.2s, transform 0.1s' }}>
                <div className='bg-white border-2 absolute top-[5rem] w-[100%] gap-3 mr-[7%] rounded-lg h-auto px-2 flex flex-col justify-between shadow-lg' >
                    <div className='flex flex-col gap-2 my-2'>


                        {/* <div className='py-1 pl-1 font-medium hover:bg-[#F8F8F8] cursor-pointer' onClick={() => {
                            router.replace(`/plans/${familyId}/checkout/?p=professional`)
                            setShowModal(false)
                        }}>Pro</div>
                        <div className='py-1 pl-1 font-medium hover:bg-[#F8F8F8] cursor-pointer' onClick={() => {
                            router.replace(`/plans/${familyId}/checkout/?p=enterprise`)
                            setShowModal(false)
                        }}>Enterprise</div>
                        <div className='py-1 pl-1 font-medium hover:bg-[#F8F8F8] cursor-pointer'>Basic Plan</div>
                        <div className='py-1 pl-1 font-medium hover:bg-[#F8F8F8] cursor-pointer' onClick={() => {
                            router.push(`/plans/${familyId}`)
                            setShowModal(false)
                        }}>Compare plan</div> */}
                        <a href={`/plans/${familyId}/checkout/?p=basic`} className='py-1 pl-1 font-medium hover:bg-[#F8F8F8] cursor-pointer' onClick={() => setShowModal(false)}>Basic</a>
                        <a href={`/plans/${familyId}/checkout/?p=premium`} className='py-1 pl-1 font-medium hover:bg-[#F8F8F8] cursor-pointer' onClick={() => setShowModal(false)}>Premium</a>
                        <div className='py-1 pl-1 font-medium hover:bg-[#F8F8F8] cursor-pointer'>Enterprise</div>
                        <a href={`/plans/${familyId}`} className='py-1 pl-1 font-medium hover:bg-[#F8F8F8] cursor-pointer' onClick={() => setShowModal(false)}>Compare plan</a>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PlanDialog