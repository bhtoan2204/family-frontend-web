import React, { useContext } from 'react'
import { Button } from '@/lib/atoms/Button';
const EditProfileModal = ({ info, setShowModal, setModalContent }: any) => {
    // const { showModal, setShowModal, modalContent, setModalContent } = useContext(ManageFamilyContext) as IManageFamily;

    const handleCancel = () => {
        setShowModal(false)
        setModalContent(null)
    }
    return (
        <div className='max-h-[90vh] min-h-[30vh] h-full grid grid-rows-12  rounded-sm transition'>
            <div className='row-span-2 px-6 py-6  flex items-center border-b-2 text-[1.4rem] font-semibold mb-4 bg-white'>
                Edit profile
            </div>

            <div className='row-span-8  overflow-y-scroll px-6 text-sm'>
                <p className='font-medium mb-4 '>Full name</p>
                <input type="text" className=' border-2 w-full mb-4 h-9 rounded-md pl-3 hover:border-blue-200' value={"klong31122001"} autoFocus />
                <p className='font-medium mb-4'>Display name &nbsp;
                    <span className='text-[#AAA9AA]'>(optional)</span>
                </p>
                <input type="text" className=' border-2 w-full mb-4 h-9 rounded-md pl-3 hover:border-blue-200' />
                <p className='font-medium mb-4'>Username</p>
                <input type="text" className=' border-2 w-full mb-2 h-9 rounded-md pl-3 bg-[#F8F8F8] text-[#616061] ' value={"klong3112"} disabled />
                <p className='text-[#1d1c1d80] text-xs mb-4 '>Username is set by the organization and can’t be changed.</p>
                <p className='font-medium mb-4'>Email</p>
                <input type="text" className=' border-2 w-full mb-2 h-9 rounded-md pl-3 bg-[#F8F8F8] text-[#616061]' value={"klong3112"} disabled />
                <p className='text-[#1d1c1d80] text-xs mb-4 '>Email is set by the organization and can’t be changed.</p>

            </div>
            <div className='row-span-2 px-6 py-6 border-t-2 flex items-center justify-end text-[1.4rem] font-semibold  bg-white mt-4'>
                <div className='flex flex-row gap-4'>
                    <Button className='w-20 font-semibold hover:bg-slate-100 transition' onClick={handleCancel}>Cancel </Button>
                    <Button className='w-20 bg-[#397097] text-white font-semibold' onClick={() => { }}>Save </Button>

                </div>
            </div>
        </div>
    )
}

export default EditProfileModal