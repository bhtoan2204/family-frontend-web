import useModal from '@/hooks/useModal';
import { Button } from '@/lib/atoms/manage/Button'
import { ModalContext } from '@/providers/ModalProvider';
import { RootState } from '@/redux/store';
import { Member } from '@/types/familyDetail';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

const ChangeAccountTypeModalV2 = ({ info }: { info: Member }) => {
    // const { showModal, setShowModal, modalContent, setModalContent } = useContext(ManageFamilyContext) as IManageFamily;
    const [userInfo, setUserInfo] = useState<Member>(info)
    const { modalRef, visible } = useModal();
    const { setShowModal, setModalContent } = useContext(ModalContext)!;
    const familyDetail = useSelector((state: RootState) => state.getFamilyDetail)
    const handleCancel = () => {
        setShowModal(false)
        setModalContent(null)
    }
    const handleSave = () => {
        setShowModal(false)
        setModalContent(null)
    }
    return (
        <div className={`h-screen w-screen fixed flex justify-center items-center z-10 `} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', transition: 'background-color 0.2s' }}>
            <div ref={modalRef} className={` h-auto bg-white transition transform w-[40rem] ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transition: 'opacity 0.2s, transform 0.1s' }}>
                <div className='max-h-[80vh] min-h-[30vh] h-full  rounded-sm transition'>
                    <div className=' px-6  flex items-center text-[1.4rem] font-semibold  bg-white mt-4'>
                        Change account type
                    </div>
                    <div className='px-6 py-5  flex items-center text-base  bg-white'>
                        Select the account type {info.firstname} {info.lastname} should have for {familyDetail.data.name} family.
                    </div>

                    <div className='row-span-8 px-6 text-sm'>
                        <p className='mb-4 font-semibold text-base'>Choose account type</p>
                        <div className="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" value="owner" name="account-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-1" className="ms-4 text-sm text-gray-900 dark:text-gray-300">Owner family</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="default-radio-2" type="radio" value="mom" name="account-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-2" className="ms-4 text-sm  text-gray-900 dark:text-gray-300">Mommy</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="default-radio-3" type="radio" value="dad" name="account-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-3" className="ms-4 text-sm  text-gray-900 dark:text-gray-300">Daddy</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="default-radio-4" type="radio" value="member" name="account-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-3" className="ms-4 text-sm  text-gray-900 dark:text-gray-300">Family member</label>
                        </div>
                    </div>

                    <div className='row-span-2 px-6 py-6  flex items-center justify-end text-[1.4rem] font-semibold  bg-white mt-4'>
                        <div className='flex flex-row gap-4'>
                            <Button className='w-14 font-semibold hover:bg-slate-100 transition' onClick={handleCancel}>Cancel </Button>
                            <Button className='w-14 bg-[#397097] text-white font-semibold' onClick={handleSave} disabled={userInfo === info}>Save </Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChangeAccountTypeModalV2