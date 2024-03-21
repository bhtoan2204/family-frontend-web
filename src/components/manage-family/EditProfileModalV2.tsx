import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button } from '@/lib/atoms/Button';
import useModal from '@/hooks/useModal';
import { ModalContext } from '@/providers/ModalProvider';
import { Member } from '@/types/familyDetail';
const EditProfileModalV2 = ({ info }: { info: Member }) => {
    const [userInfo, setUserInfo] = useState<Member>(Object.assign({}, info))
    const { modalRef, visible } = useModal();
    const { setShowModal, setModalContent } = useContext(ModalContext)!;
    const handleCancel = () => {
        setShowModal(false)
        setModalContent(null)
    }
    return (
        <div className={`h-screen w-screen fixed flex justify-center items-center z-10 `} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', transition: 'background-color 0.2s' }}>
            <div ref={modalRef} className={` h-auto bg-white transition transform w-[40rem] ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transition: 'opacity 0.2s, transform 0.1s' }}>
                <div className='max-h-[90vh] min-h-[30vh] h-full grid grid-rows-12  rounded-sm transition'>
                    <div className='row-span-2 px-6 py-6  flex items-center border-b-2 text-[1.4rem] font-semibold mb-4 bg-white'>
                        Edit profile
                    </div>

                    <div className='row-span-8  overflow-y-scroll px-6 text-sm'>
                        <p className='font-medium mb-4 '>First Name</p>
                        <input type="text" className=' border-2 w-full mb-4 h-9 rounded-md pl-3 hover:border-blue-200' defaultValue={info.firstname.toString()} autoFocus onChange={(e) => {
                            setUserInfo({ ...userInfo, firstname: e.target.value })
                        }} />
                        <p className='font-medium mb-4'>Last name &nbsp;
                            <span className='text-[#AAA9AA]'></span>
                        </p>
                        <input type="text" className=' border-2 w-full mb-4 h-9 rounded-md pl-3 hover:border-blue-200' defaultValue={info.lastname.toString()} onChange={(e) => {
                            setUserInfo({ ...userInfo, lastname: e.target.value })
                        }} />
                        <p className='font-medium mb-4'>Phone</p>
                        <input type="text" className=' border-2 w-full mb-2 h-9 rounded-md pl-3 bg-[#F8F8F8] text-[#616061] ' defaultValue={info.phone.toString()} disabled />
                        <p className='text-[#1d1c1d80] text-xs mb-4 '>Phone is set by the organization and can’t be changed.</p>
                        <p className='font-medium mb-4'>Email</p>
                        <input type="text" className=' border-2 w-full mb-2 h-9 rounded-md pl-3 bg-[#F8F8F8] text-[#616061]' value={info.email.toString()} disabled />
                        <p className='text-[#1d1c1d80] text-xs mb-4 '>Email is set by the organization and can’t be changed.</p>

                    </div>
                    <div className='row-span-2 px-6 py-6 border-t-2 flex items-center justify-end text-[1.4rem] font-semibold  bg-white mt-4'>
                        <div className='flex flex-row gap-4'>
                            <Button className='w-20 font-semibold hover:bg-slate-100 transition' onClick={handleCancel}>Cancel </Button>
                            <Button className='w-20 disabled:bg-gray-400 disabled:text-white bg-[#397097] text-white font-semibold' onClick={() => { }} disabled={userInfo.firstname === info.firstname &&
                                userInfo.lastname === info.lastname &&
                                userInfo.phone === info.phone &&
                                userInfo.email === info.email}>Save </Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditProfileModalV2