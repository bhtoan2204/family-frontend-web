"use client"
import useModal from '@/hooks/useModal';
import ElasticDotLoading from '@/lib/atoms/Loading/ElasticLoading';
import { ModalContext } from '@/providers/ModalProvider';
import { RootState, useAppDispatch } from '@/redux/store';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import React, { useContext } from 'react'
import { useSelector } from 'react-redux';


const FamilyDialog = () => {
    const router = useRouter()
    const params = useParams()
    const familyId = params["familyId"]
    const families2 = useSelector((state: RootState) => state.getAllFamily);
    const { setShowModal } = useContext(ModalContext)!;;
    const { modalRef, visible } = useModal();

    if (families2.loading == true) {
        <div className={`h-screen w-screen fixed z-10  `} style={{ backgroundColor: "transparent", transition: 'background-color 0.2s' }}>
            <div ref={modalRef} className={` h-auto w-[14rem] bg-white transition transform absolute right-20 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transition: 'opacity 0.2s, transform 0.1s' }}>
                <div className='bg-white border-2 absolute top-[5rem] w-[100%] gap-3 mr-[7%] rounded-lg h-auto px-2 flex flex-col justify-between shadow-lg' >
                    <div className='flex flex-col gap-2 my-2'>
                        <ElasticDotLoading />
                    </div>

                </div>
            </div>
        </div>
    } else
        return (
            <div className={`h-screen w-screen fixed z-10  `} style={{ backgroundColor: "transparent", transition: 'background-color 0.2s' }}>
                <div ref={modalRef} className={` h-auto w-[20rem] bg-white transition transform absolute right-20 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transition: 'opacity 0.2s, transform 0.1s' }}>
                    <div className='bg-white border-2 absolute top-[5rem] w-[100%] gap-3 mr-[7%] rounded-lg h-[30rem] px-2 flex flex-col justify-between shadow-lg overflow-y-scroll overflow-x-hidden' >
                        <div className='flex flex-col gap-2 my-2 '>
                            {
                                families2?.data.length != 0 ?
                                    <React.Fragment>
                                        {
                                            families2.data.map((family, index) => {
                                                return <React.Fragment key={family.id_family}>
                                                    <div className='flex flex-row  gap-3 items-center p-2 hover:bg-[#F8F8F8] cursor-pointer' onClick={() => {
                                                        router.replace(`/manage/${family.id_family}`)
                                                        setShowModal(false)
                                                    }}>
                                                        <div className='flex flex-row gap-3 items-center w-[80%]'>
                                                            <Image src='/student.png' width={40} height={40} alt='fam_photo' />
                                                            <div className='w-full overflow-clip '>

                                                                <p className='font-medium'>{family.name}</p>
                                                            </div>
                                                        </div>
                                                        {family.id_family == parseInt(familyId as string) ?
                                                            <div className='flex flex-row justify-end flex-grow '>
                                                                <div >

                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>


                                                                </div>
                                                            </div>
                                                            : null}

                                                    </div>


                                                </React.Fragment>
                                            })
                                        }

                                    </React.Fragment>

                                    : <div className='text-center'>No family found</div>
                            }

                        </div>

                    </div>
                </div>
            </div>

        )
}

export default FamilyDialog