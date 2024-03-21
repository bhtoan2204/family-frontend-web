import { Button } from '@/lib/atoms/manage/Button'
import React from 'react'

const ChangeAccountTypeModal = ({ info, setShowModal, setModalContent }: any) => {
    const handleCancel = () => {
        setShowModal(false)
        setModalContent(null)
    }
    const handleSave = () => {
        setShowModal(false)
        setModalContent(null)
    }
    return (
        <div className='max-h-[80vh] min-h-[30vh] h-full  rounded-sm transition'>
            <div className=' px-6  flex items-center text-[1.4rem] font-semibold  bg-white mt-4'>
                Change account type
            </div>
            <div className='px-6 py-5  flex items-center text-base  bg-white'>
                Select the account type Long 2 should have for Ls WorkSpace.
            </div>

            <div className='row-span-8 px-6 text-sm'>
                <p className='mb-4 font-semibold text-base'>Choose account type</p>
                <div className="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="head_of_family" name="account-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-radio-1" className="ms-4 text-sm text-gray-900 dark:text-gray-300">Head of family</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="default-radio-2" type="radio" value="parents" name="account-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-radio-2" className="ms-4 text-sm  text-gray-900 dark:text-gray-300">Parents</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="default-radio-3" type="radio" value="family_members" name="account-type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-radio-3" className="ms-4 text-sm  text-gray-900 dark:text-gray-300">Family members</label>
                </div>
            </div>

            <div className='row-span-2 px-6 py-6  flex items-center justify-end text-[1.4rem] font-semibold  bg-white mt-4'>
                <div className='flex flex-row gap-4'>
                    <Button className='w-14 font-semibold hover:bg-slate-100 transition' onClick={handleCancel}>Cancel </Button>
                    <Button className='w-14 bg-[#397097] text-white font-semibold' onClick={handleSave}>Save </Button>

                </div>
            </div>
        </div>
    )
}

export default ChangeAccountTypeModal